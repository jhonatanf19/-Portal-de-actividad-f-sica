package com.grupo1.login.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.login.dto.MetaSemanalDTO;
import com.grupo1.login.model.MetaSemanal;
import com.grupo1.login.service.MetaSemanalService;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "http://localhost:3000")
public class MetaSemanalController {

    private final MetaSemanalService metaSemanalService;

    public MetaSemanalController(MetaSemanalService metaSemanalService) {
        this.metaSemanalService = metaSemanalService;
    }

    @PostMapping("/guardar")
    public MetaSemanal guardarMeta(@RequestBody MetaSemanalDTO metaSemanalDTO) {
        return metaSemanalService.guardarMeta(metaSemanalDTO);
    }

    @GetMapping("/usuario/{usuarioId}")
    public MetaSemanal obtenerUltimaMeta(@PathVariable Long usuarioId) {
        return metaSemanalService.obtenerUltimaMeta(usuarioId);
    }
}