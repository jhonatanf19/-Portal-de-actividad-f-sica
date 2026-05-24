package com.grupo1.login.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class FiltroJwt extends OncePerRequestFilter {

    @Autowired
    private ServicioJwt servicioJwt;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();

        // Dejar pasar preflight de CORS
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Rutas públicas
        if (path.equals("/api/usuarios/login") ||
            path.equals("/api/usuarios/registrar") ||
            path.equals("/api/usuarios/forgot-password") ||
            path.equals("/api/usuarios/reset-password") ||
            path.equals("/api/usuarios/verificar-codigo") ||
            path.startsWith("/api/recuperacion/")) {

            filterChain.doFilter(request, response);
            return;
        }

        String encabezado = request.getHeader("Authorization");

        // Si no hay token, deja seguir. Spring Security decidirá si esa ruta requiere auth.
        if (encabezado == null || !encabezado.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = encabezado.substring(7);

        if (servicioJwt.validarToken(token)) {
            String email = servicioJwt.extraerEmail(token);
            String rol = servicioJwt.extraerRol(token);

            System.out.println("Autenticación exitosa - Email: " + email + " | Rol: " + rol);

            SimpleGrantedAuthority autoridad = new SimpleGrantedAuthority("ROLE_" + rol);

            UsernamePasswordAuthenticationToken autenticacion =
                    new UsernamePasswordAuthenticationToken(email, null, List.of(autoridad));

            SecurityContextHolder.getContext().setAuthentication(autenticacion);
        }

        filterChain.doFilter(request, response);
    }
}
