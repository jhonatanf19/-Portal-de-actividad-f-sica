package com.grupo1.login.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.grupo1.login.dto.ActividadDTO;
import com.grupo1.login.model.ActividadFisica;
import com.grupo1.login.repository.ActividadFisicaRepository;

@Service
public class ActividadFisicaService {

    private final ActividadFisicaRepository actividadFisicaRepository;

    public ActividadFisicaService(ActividadFisicaRepository actividadFisicaRepository) {
        this.actividadFisicaRepository = actividadFisicaRepository;
    }

    public ActividadFisica registrarActividad(ActividadDTO dto) {
        ActividadFisica actividad = new ActividadFisica();

        actividad.setUsuarioId(dto.getUsuarioId());
        actividad.setFecha(dto.getFecha());
        actividad.setPasos(dto.getPasos());
        actividad.setCalorias(dto.getCalorias());
        actividad.setFrecuenciaCardiaca(dto.getFrecuenciaCardiaca());

        if (dto.getOrigen() == null || dto.getOrigen().isBlank()) {
            actividad.setOrigen("MANUAL");
        } else {
            actividad.setOrigen(dto.getOrigen());
        }

        return actividadFisicaRepository.save(actividad);
    }

    public ActividadFisica generarActividadSimulada(Long usuarioId) {
        Random random = new Random();

        int pasos = random.nextInt(6000, 15001);
        int calorias = random.nextInt(200, 801);
        int frecuencia = random.nextInt(60, 121);

        ActividadFisica actividad = new ActividadFisica();
        actividad.setUsuarioId(usuarioId);
        actividad.setFecha(LocalDate.now());
        actividad.setPasos(pasos);
        actividad.setCalorias(calorias);
        actividad.setFrecuenciaCardiaca(frecuencia);
        actividad.setOrigen("SIMULADO");

        return actividadFisicaRepository.save(actividad);
    }

    public List<ActividadFisica> listarPorUsuario(Long usuarioId) {
        return actividadFisicaRepository.findByUsuarioIdOrderByFechaAsc(usuarioId);
    }
}