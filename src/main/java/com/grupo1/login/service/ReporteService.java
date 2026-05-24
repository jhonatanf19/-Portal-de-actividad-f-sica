package com.grupo1.login.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.grupo1.login.dto.ReporteProgresoDTO;
import com.grupo1.login.model.ActividadFisica;
import com.grupo1.login.model.MetaSemanal;
import com.grupo1.login.repository.ActividadFisicaRepository;
import com.grupo1.login.repository.MetaSemanalRepository;

@Service
public class ReporteService {

    private final ActividadFisicaRepository actividadFisicaRepository;
    private final MetaSemanalRepository metaSemanalRepository;

    public ReporteService(
            ActividadFisicaRepository actividadFisicaRepository,
            MetaSemanalRepository metaSemanalRepository
    ) {
        this.actividadFisicaRepository = actividadFisicaRepository;
        this.metaSemanalRepository = metaSemanalRepository;
    }

    public ReporteProgresoDTO generarReporte(Long usuarioId) {
        MetaSemanal meta = metaSemanalRepository.findTopByUsuarioIdOrderByFechaInicioDesc(usuarioId)
                .orElseThrow(() -> new RuntimeException("El usuario no tiene metas semanales registradas"));

        List<ActividadFisica> actividades = actividadFisicaRepository
                .findByUsuarioIdAndFechaBetweenOrderByFechaAsc(
                        usuarioId,
                        meta.getFechaInicio(),
                        meta.getFechaFin()
                );

        int totalPasos = actividades.stream()
                .mapToInt(ActividadFisica::getPasos)
                .sum();

        int totalCalorias = actividades.stream()
                .mapToInt(ActividadFisica::getCalorias)
                .sum();

        int promedioFrecuencia = actividades.isEmpty()
                ? 0
                : (int) actividades.stream()
                    .mapToInt(ActividadFisica::getFrecuenciaCardiaca)
                    .average()
                    .orElse(0);

        double porcentajePasos = calcularPorcentaje(totalPasos, meta.getMetaPasos());
        double porcentajeCalorias = calcularPorcentaje(totalCalorias, meta.getMetaCalorias());
        double porcentajeFrecuencia = calcularPorcentaje(promedioFrecuencia, meta.getMetaFrecuenciaCardiaca());

        double promedioGeneral = (porcentajePasos + porcentajeCalorias + porcentajeFrecuencia) / 3;

        ReporteProgresoDTO reporte = new ReporteProgresoDTO();

        reporte.setUsuarioId(usuarioId);
        reporte.setFechaInicio(meta.getFechaInicio());
        reporte.setFechaFin(meta.getFechaFin());

        reporte.setTotalPasos(totalPasos);
        reporte.setTotalCalorias(totalCalorias);
        reporte.setPromedioFrecuenciaCardiaca(promedioFrecuencia);

        reporte.setMetaPasos(meta.getMetaPasos());
        reporte.setMetaCalorias(meta.getMetaCalorias());
        reporte.setMetaFrecuenciaCardiaca(meta.getMetaFrecuenciaCardiaca());

        reporte.setPorcentajePasos(porcentajePasos);
        reporte.setPorcentajeCalorias(porcentajeCalorias);
        reporte.setPorcentajeFrecuenciaCardiaca(porcentajeFrecuencia);

        reporte.setEstadoGeneral(obtenerEstado(promedioGeneral));

        return reporte;
    }

    private double calcularPorcentaje(int valor, int meta) {
        if (meta <= 0) {
            return 0;
        }

        return Math.round(((valor * 100.0) / meta) * 100.0) / 100.0;
    }

    private String obtenerEstado(double porcentaje) {
        if (porcentaje >= 90) {
            return "Excelente progreso";
        } else if (porcentaje >= 70) {
            return "Vas bien";
        } else {
            return "Debes mejorar";
        }
    }
}