var urlReservas = 'http://20.216.41.245:90/G6_19/controller/reserva.php?opc=GetReservas'
var urlInsertReservas = 'http://20.216.41.245:90/G6_19/controller/reserva.php?opc=InsertReserva'
var urlUpdateReserva = 'http://20.216.41.245:90/G6_19/controller/reserva.php?opc=UpDateReserva'
var urlGetReserva = 'http://20.216.41.245:90/G6_19/controller/reserva.php?opc=GetReserva'
var urlEliminarReserva= 'http://20.216.41.245:90/G6_19/controller/reserva.php?opc=DeleteReserva'
$(document).ready(function(){
    CargarReservas();
});

function CargarReservas(){
    $.ajax({
        url: urlReservas,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores='';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>'+
                '<td>'+ MiItems[i].NUMERO_RESERVACION +'</td>'+
                '<td>'+ MiItems[i].CODIGO_VUELO +'</td>'+
                '<td>'+ MiItems[i].CODIGO_PASAJERO +'</td>'+
                '<td>'+ MiItems[i].NOMBRE_PASAJERO +'</td>'+
                '<td>'+ MiItems[i].CIUDAD_DESTINO +'</td>'+
                '<td>'+ MiItems[i].FECHA_VUELO +'</td>'+
                '<td>'+ MiItems[i].PRECIO_VUELO +'</td>'+
                '<td>' +
                '<button class = "btn btn-info" onclick = "CargarReserva(' + MiItems[i].NUMERO_RESERVACION + ')">Editar</button>' +
                '</td>' +
                '<td>' +
                '<button class = "btn btn-danger" onclick = "EliminarReserva(' + MiItems[i].NUMERO_RESERVACION + ')">Eliminar</button>' +
                '</td>' +            
                '<tr/>';
                $('#DataReservas').html(Valores);
            }
        }
    });
}

function AgregarReserva() {
    var datosReserva = {
        NUMERO_RESERVACION: $('#NUMERO_RESERVACION').val(),
        CODIGO_VUELO: $('#CODIGO_VUELO').val(),
        CODIGO_PASAJERO: $('#CODIGO_PASAJERO').val(),
        NOMBRE_PASAJERO: $('#NOMBRE_PASAJERO').val(),
        CIUDAD_DESTINO: $('#CIUDAD_DESTINO').val(),
        FECHA_VUELO: $('#FECHA_VUELO').val(),
        PRECIO_VUELO: $('#PRECIO_VUELO').val()
    };
    var datosReservaJSON = JSON.stringify(datosReserva);


    $.ajax({
        url: urlInsertReservas,
        type: 'POST',
        data: datosReservaJSON,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse) {
            console.log(reponse);
            alert('Reserva agregada correctamente')
        },
        error: function (textstatus,errorThrown) {
            alert('Error al agregar reserva'+textstatus+errorThrown)
        }
    });
    alert('Aviso');
}

function CargarReserva(numeroReserva) {
    var datosReserva= {
        NUMERO_RESERVACION: numeroReserva
    }
    var datosReservaJSON = JSON.stringify(datosReserva);

    $.ajax({
        url: urlGetReserva,
        type: 'POST',
        data: datosReservaJSON,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse) {
            var MiItems=reponse;
            $('#NUMERO_RESERVACION').val(MiItems[0].NUMERO_RESERVACION);
            $('#CODIGO_VUELO').val(MiItems[0].CODIGO_VUELO);
            $('#CODIGO_PASAJERO').val(MiItems[0].CODIGO_PASAJERO);
            $('#NOMBRE_PASAJERO').val(MiItems[0].NOMBRE_PASAJERO);
            $('#CIUDAD_DESTINO').val(MiItems[0].CIUDAD_DESTINO);
            $('#FECHA_VUELO').val(MiItems[0].FECHA_VUELO);
            $('#PRECIO_VUELO').val(MiItems[0].PRECIO_VUELO);
            var btnActualizar = '<input type = "submit" id = "btn_actualizar" onclick = "ActualizarReserva('+ MiItems[0].NUMERO_RESERVACION +')"' + 
            'value = "Actualizar Reserva" class = "btn btn-primary"></input>';
            $('#btnAgregarReserva').html(btnActualizar);
        }
    });
}

function ActualizarReserva(numeroReserva) {
var datosReserva= {
    NUMERO_RESERVACION: numeroReserva,
    CODIGO_VUELO: $('#CODIGO_VUELO').val(),
    CODIGO_PASAJERO: $('#CODIGO_PASAJERO').val(),
    NOMBRE_PASAJERO: $('#NOMBRE_PASAJERO').val(),
    CIUDAD_DESTINO: $('#CIUDAD_DESTINO').val(),
    FECHA_VUELO: $('#FECHA_VUELO').val(),
    PRECIO_VUELO: $('#PRECIO_VUELO').val()
};
var datosReservaJSON= JSON.stringify(datosReserva);
$.ajax({
    url:urlUpdateReserva,
    type:'PUT',
    data: datosReservaJSON,
    datatype: 'JSON',
    contentType: 'application/json',
    success:function(reponse){
        console.log(reponse);
        alert('Reserva Actualizada');
    },
    error: function(textstatus, errorThrown){
        alert('Error al actualizar reserva'+textstatus+errorThrown);
    }
});
    alert('Aviso');
}

function EliminarReserva(eliminarReserva) {
    var datosReserva={
        NUMERO_RESERVACION: eliminarReserva
    };
    var datosReservaJSON= JSON.stringify(datosReserva);
    $.ajax({
        url: urlEliminarReserva,
        type: 'DELETE',
        data: datosReservaJSON,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse) {
            alert('Reserva Eliminada');
        },
        error: function (textstatus,errorThrown) {
            alert('Error al eliminar reserva'+textstatus+errorThrown);
        }
    });
    alert('Aviso');
    CargarReservas();
}
