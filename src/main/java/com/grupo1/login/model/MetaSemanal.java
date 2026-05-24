package com.grupo1.login.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "meta_semanal")
public class MetaSemanal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_meta")
    private Long idMeta;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "meta_pasos", nullable = false)
    private Integer metaPasos;

    @Column(name = "meta_calorias", nullable = false)
    private Integer metaCalorias;

    @Column(name = "meta_frecuencia_cardiaca", nullable = false)
    private Integer metaFrecuenciaCardiaca;

    public MetaSemanal() {
    }

    public MetaSemanal(Long usuarioId, LocalDate fechaInicio, LocalDate fechaFin, Integer metaPasos, Integer metaCalorias, Integer metaFrecuenciaCardiaca) {
        this.usuarioId = usuarioId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.metaPasos = metaPasos;
        this.metaCalorias = metaCalorias;
        this.metaFrecuenciaCardiaca = metaFrecuenciaCardiaca;
    }

    public Long getIdMeta() {
        return idMeta;
    }

    public void setIdMeta(Long idMeta) {
        this.idMeta = idMeta;
    }

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