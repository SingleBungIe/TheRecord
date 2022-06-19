package com.record.the_record.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;


@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    private static final String[] NO_ROLE_URLS = {"/api/user/signup",
            "/api/user/id-check/**", "/api/user/login", "/api/user/email/number", "/api/user/email-check", "/api/user/password/reissue",
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources/**",
            /* swagger v3 */
            "/swagger-ui/**"};

    // password 암호화 Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // AuthenticationManager 등록
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        /* Spring Security 설정 */
        http
                .httpBasic().disable() // rest api 만을 고려하여 기본 설정은 해제
                .cors().configurationSource(corsConfigurationSource())  // CORS 글로벌 설정
                .and()
                .csrf().disable() // csrf 보안 토큰 disable처리
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 역시 사용하지 않음
                .and()
                .authorizeRequests()
                .antMatchers(NO_ROLE_URLS)
                .permitAll()
                .anyRequest().hasRole("USER")
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }

    // CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList("https://the-record.co.kr", "http://localhost:3000"));    // 허용 url
        configuration.setAllowedMethods(Arrays.asList("OPTIONS", "GET", "POST", "PUT", "DELETE"));              // 허용 메소드
        configuration.setAllowedHeaders(Collections.singletonList("*"));       // 허용 헤더
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Collections.singletonList("X-AUTH-TOKEN"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
