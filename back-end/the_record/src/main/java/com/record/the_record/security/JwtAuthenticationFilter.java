package com.record.the_record.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * UsernamePasswordAuthenticationFilter?
 * form based authentication 방식으로 인증 진행 시
 * 아이디, 패스워드 데이터를 파싱해 인증 요청을 위임하는 필터
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 헤더에서 Jwt 반환
        String accessToken = jwtTokenProvider.resolveAccessToken((HttpServletRequest) request);
        // 토큰 유효성 검사
        if (accessToken != null && jwtTokenProvider.validateToken(accessToken)) {
            // 유효한 토큰이라면 유저 정보 반환
            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
            // SecurityContext에 Authentication 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}
