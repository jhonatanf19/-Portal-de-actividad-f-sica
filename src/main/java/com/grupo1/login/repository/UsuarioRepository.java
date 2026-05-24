package com.grupo1.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grupo1.login.model.Usuario;

@Repository // Gestiona el acceso y las operaciones CRUD en la base de datos
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Define una consulta personalizada para localizar usuarios mediante su correo electrónico
    // Devuelve un Optional para gestionar de forma segura los casos donde el email no existe
    Optional<Usuario> findByEmail (String email);

}
