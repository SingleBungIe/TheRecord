package com.record.the_record.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private String secretKey = "secret";
    private long ACCESS_TOKEN_VALID_TIME = 60 * 60 * 24 * 1000L;
    private long REFRESH_TOKEN_VALID_TIME = 60 * 60 * 24 * 1000L;
    private final CustomUserDetailsService userDetailsService;

    /**
     * WAS 실행 시 초기화
     * secretKey를 Base64로 인코딩
     */
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(Long userPk, String userId, String role) {
        Map<String, Object> payLoads = new HashMap<>(); // Jwt payload에 저장되는 단위
        payLoads.put("userPk", userPk);
        payLoads.put("userId", userId);
        payLoads.put("role", role);                     // key, value 쌍으로 저장
        Date now = new Date();
        return Jwts.builder()
                .setClaims(payLoads)  // 정보 저장
                .setIssuedAt(now)   // 토큰 발행 시간
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME))   // 토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 암호화 알고리즘, secret값
                .compact();
    }

    public String createRefreshToken(String password, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(password); // Jwt payload에 저장되는 단위
        claims.put("roles", roles); // key, value 쌍으로 저장
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)  // 정보 저장
                .setIssuedAt(now)   // 토큰 발행 시간
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME))   // 토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey)  // 암호화 알고리즘, secret값
                .compact();
    }

    // Jwt 토큰에서 인증 정보 조회, 인증 성공 시 SecurityContextHolder에 저장할 Authentication 객체 생성
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getPassword(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 회원 정보 추출
    private String getPassword(String token) {
        return (String) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("userId");
    }

    // Request Header에서 토큰 추출
    public String resolveAccessToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    public String resolveRefreshToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
