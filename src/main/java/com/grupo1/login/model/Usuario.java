package com.grupo1.login.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Genera automáticamente getters, setters, toString, equals y hashCode
@AllArgsConstructor // Crea un constructor con todos los atributos
@NoArgsConstructor // Crea un constructor vacío
@Entity // Indica que esta clase será una tabla en la base de datos
@Table(name = "tbl_usuario") // Nombre de la tabla en la base de datos
public class Usuario {

    @Id // Define la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementa el ID en la BD

    @Column(name = "id_usuario") // Nombre de la columna en la tabla
    private Long idUsuario;

    @Column(unique = true, nullable = false) // email único y obligatorio
    private String email;

    @Column(nullable = false) // contraseña obligatoria y será encriptada con BCrypt
    private String password;

    // Define el rol del usuario, este campo será obligatorio
    @Enumerated(EnumType.STRING) // Guarda el rol como texto en SQL en vez de números
    @Column(nullable = false)
    private Roles rol; // El Admin decidirá esto

    @Column(name = "intentos_fallidos") // Contador para controlar el bloqueo de seguridad
    private int intentosFallidos = 0;

    @Column(name = "cuenta_bloqueada") // Verifica si la cuenta está bloqueada o no
    private boolean cuentaBloqueada = false;

}
