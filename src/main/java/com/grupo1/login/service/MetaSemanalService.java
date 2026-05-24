package com.grupo1.login.service;

import org.springframework.stereotype.Service;

import com.grupo1.login.dto.MetaSemanalDTO;
import com.grupo1.login.model.MetaSemanal;
import com.grupo1.login.repository.MetaSemanalRepository;

@Service
public class MetaSemanalService {

    private final MetaSemanalRepository metaSemanalRepository;

    public MetaSemanalService(MetaSemanalRepository metaSemanalRepository) {
        this.metaSemanalRepository = metaSemanalRepository;
    }

    public MetaSemanal guardarMeta(MetaSemanalDTO dto) {
        MetaSemanal meta = new MetaSemanal();

        meta.setUsuarioId(dto.getUsuarioId());
        meta.setFechaInicio(dto.getFechaInicio());
        meta.setFechaFin(dto.getFechaFin());
        meta.setMetaPasos(dto.getMetaPasos());
        meta.setMetaCalorias(dto.getMetaCalorias());
        meta.setMetaFrecuenciaCardiaca(dto.getMetaFrecuenciaCardiaca());

        return metaSemanalRepository.save(meta);
    }

    public MetaSemanal obtenerUltimaMeta(Long usuarioId) {
        return metaSemanalRepository.findTopByUsuarioIdOrderByFechaInicioDesc(usuarioId)
                .orElse(null);
    }
}