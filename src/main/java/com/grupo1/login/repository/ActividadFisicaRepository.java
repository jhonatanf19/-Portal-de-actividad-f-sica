package com.grupo1.login.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo1.login.model.ActividadFisica;

public interface ActividadFisicaRepository extends JpaRepository<ActividadFisica, Long> {

    List<ActividadFisica> findByUsuarioIdOrderByFechaAsc(Long usuarioId);

    List<ActividadFisica> findByUsuarioIdAndFechaBetweenOrderByFechaAsc(
            Long usuarioId,
            LocalDate fechaInicio,
            LocalDate fechaFin
    );
}