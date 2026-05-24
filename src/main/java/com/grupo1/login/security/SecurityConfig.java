package com.grupo1.login.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private FiltroJwt filtroJwt;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

<<<<<<< HEAD
                        // públicas - login y recuperación
=======
                        // públicas
>>>>>>> origin/main
                        .requestMatchers("/api/usuarios/login").permitAll()
                        .requestMatchers("/api/usuarios/registrar").permitAll()
                        .requestMatchers("/api/usuarios/forgot-password").permitAll()
                        .requestMatchers("/api/usuarios/reset-password").permitAll()
                        .requestMatchers("/api/usuarios/verificar-codigo").permitAll()

<<<<<<< HEAD
                        // públicas - recuperación si usas otro controlador/ruta
                        .requestMatchers("/api/recuperacion/**").permitAll()

                        // públicas - portal de actividad física
                        .requestMatchers("/api/actividad/**").permitAll()
                        .requestMatchers("/api/metas/**").permitAll()
                        .requestMatchers("/api/reportes/**").permitAll()

=======
                        // recuperación si usas otro controlador/ruta
                        .requestMatchers("/api/recuperacion/**").permitAll()

>>>>>>> origin/main
                        // admin protegida
                        .requestMatchers("/api/administrador/**").hasRole("ADMINISTRADOR")

                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .logout(logout -> logout.disable())
                .addFilterBefore(filtroJwt, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://localhost:5173",
                "http://loginspring.free.nf",
                "https://loginspring.free.nf"
        ));
<<<<<<< HEAD

=======
>>>>>>> origin/main
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
<<<<<<< HEAD

        return source;
    }
}
=======
        return source;
    }
}
>>>>>>> origin/main
