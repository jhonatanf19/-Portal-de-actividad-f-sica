package com.grupo1.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grupo1.login.model.TokenRecuperacionPassword;

@Repository // Gestiona el acceso y las operaciones CRUD en la base de datos
public interface TokenRecuperacionPasswordRepository extends JpaRepository<TokenRecuperacionPassword, Long> {

    // Para buscar el registro cuando el usuario haga clic en el enlace del correo
    Optional<TokenRecuperacionPassword> findByTokenRecuperacion(String token);

    // Reemplaza el token viejo antes de crear uno nuevo por el OneToOne
    void deleteByUsuarioIdUsuario(Long idUsuario);

}
