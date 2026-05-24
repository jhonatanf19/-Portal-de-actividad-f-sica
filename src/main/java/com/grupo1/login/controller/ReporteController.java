package com.grupo1.login.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.login.dto.ReporteProgresoDTO;
import com.grupo1.login.service.ReporteService;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "http://localhost:3000")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ReporteProgresoDTO generarReporte(@PathVariable Long usuarioId) {
        return reporteService.generarReporte(usuarioId);
    }
}