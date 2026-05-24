package com.grupo1.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo1.login.model.MetaSemanal;

public interface MetaSemanalRepository extends JpaRepository<MetaSemanal, Long> {

    Optional<MetaSemanal> findTopByUsuarioIdOrderByFechaInicioDesc(Long usuarioId);
}