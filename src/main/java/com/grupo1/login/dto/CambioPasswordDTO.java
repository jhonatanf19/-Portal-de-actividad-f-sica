package com.grupo1.login.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data // Genera automáticamente getters, setters, toString, equals y hashCode
public class CambioPasswordDTO {

    @NotBlank(message = "El token es obligatorio")
    private String token; // El código UUID que copias de Mailtrap

    @NotBlank(message = "La nueva contraseña es obligatoria")
    private String nuevaPassword; // La contraseña que el usuario quiere ahora

}
