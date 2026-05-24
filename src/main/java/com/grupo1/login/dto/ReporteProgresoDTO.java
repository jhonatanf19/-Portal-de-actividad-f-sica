package com.grupo1.login.dto;

import java.time.LocalDate;

public class ReporteProgresoDTO {

    private Long usuarioId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    private Integer totalPasos;
    private Integer totalCalorias;
    private Integer promedioFrecuenciaCardiaca;

    private Integer metaPasos;
    private Integer metaCalorias;
    private Integer metaFrecuenciaCardiaca;

    private Double porcentajePasos;
    private Double porcentajeCalorias;
    private Double porcentajeFrecuenciaCardiaca;

    private String estadoGeneral;

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

    public Integer getTotalPasos() {
        return totalPasos;
    }

    public void setTotalPasos(Integer totalPasos) {
        this.totalPasos = totalPasos;
    }

    public Integer getTotalCalorias() {
        return totalCalorias;
    }

    public void setTotalCalorias(Integer totalCalorias) {
        this.totalCalorias = totalCalorias;
    }

    public Integer getPromedioFrecuenciaCardiaca() {
        return promedioFrecuenciaCardiaca;
    }

    public void setPromedioFrecuenciaCardiaca(Integer promedioFrecuenciaCardiaca) {
        this.promedioFrecuenciaCardiaca = promedioFrecuenciaCardiaca;
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

    public Double getPorcentajePasos() {
        return porcentajePasos;
    }

    public void setPorcentajePasos(Double porcentajePasos) {
        this.porcentajePasos = porcentajePasos;
    }

    public Double getPorcentajeCalorias() {
        return porcentajeCalorias;
    }

    public void setPorcentajeCalorias(Double porcentajeCalorias) {
        this.porcentajeCalorias = porcentajeCalorias;
    }

    public Double getPorcentajeFrecuenciaCardiaca() {
        return porcentajeFrecuenciaCardiaca;
    }

    public void setPorcentajeFrecuenciaCardiaca(Double porcentajeFrecuenciaCardiaca) {
        this.porcentajeFrecuenciaCardiaca = porcentajeFrecuenciaCardiaca;
    }

    public String getEstadoGeneral() {
        return estadoGeneral;
    }

    public void setEstadoGeneral(String estadoGeneral) {
        this.estadoGeneral = estadoGeneral;
    }
}