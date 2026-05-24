package com.grupo1.login.dto;

import java.time.LocalDate;

public class MetaSemanalDTO {

    private Long usuarioId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Integer metaPasos;
    private Integer metaCalorias;
    private Integer metaFrecuenciaCardiaca;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Integer getMetaPasos() {
        return metaPasos;
    }

    public void setMetaPasos(Integer metaPasos) {
        this.metaPasos = metaPasos;
    }

    public Integer getMetaCalorias() {
        return metaCalorias;
    }

    public void setMetaCalorias(Integer metaCalorias) {
        this.metaCalorias = metaCalorias;
    }

    public Integer getMetaFrecuenciaCardiaca() {
        return metaFrecuenciaCardiaca;
    }

    public void setMetaFrecuenciaCardiaca(Integer metaFrecuenciaCardiaca) {
        this.metaFrecuenciaCardiaca = metaFrecuenciaCardiaca;
    }
}