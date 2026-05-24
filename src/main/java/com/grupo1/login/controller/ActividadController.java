package com.grupo1.login.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.login.dto.ActividadDTO;
import com.grupo1.login.model.ActividadFisica;
import com.grupo1.login.service.ActividadFisicaService;

@RestController
@RequestMapping("/api/actividad")
@CrossOrigin(origins = "http://localhost:3000")
public class ActividadController {

    private final ActividadFisicaService actividadFisicaService;

    public ActividadController(ActividadFisicaService actividadFisicaService) {
        this.actividadFisicaService = actividadFisicaService;
    }

    @PostMapping("/registrar")
    public ActividadFisica registrarActividad(@RequestBody ActividadDTO actividadDTO) {
        return actividadFisicaService.registrarActividad(actividadDTO);
    }

    @PostMapping("/simular/{usuarioId}")
    public ActividadFisica generarActividadSimulada(@PathVariable Long usuarioId) {
        return actividadFisicaService.generarActividadSimulada(usuarioId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<ActividadFisica> listarActividadesPorUsuario(@PathVariable Long usuarioId) {
        return actividadFisicaService.listarPorUsuario(usuarioId);
    }
}