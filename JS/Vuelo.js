var UrlVuelos = 'http://20.216.41.245:90/G6_19/controller/vuelo.php?opc=Getvuelos';
var UrlInsertVuelo = 'http://20.216.41.245:90/G6_19/controller/vuelo.php?opc=Insertvuelo';
var UrlGetVuelo = 'http://20.216.41.245:90/G6_19/controller/vuelo.php?opc=Getvuelo';
var UrlUpdateVuelo = 'http://20.216.41.245:90/G6_19/controller/vuelo.php?opc=Updatevuelo';
var UrlDeleteVuelo = 'http://20.216.41.245:90/G6_19/controller/vuelo.php?opc=Deletevuelo';

$(document).ready(function(){
    CargarVuelos();
});

function CargarVuelos(){
    $.ajax({
        url: UrlVuelos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].codigo_Vuelo +'</td>' +
                '<td>'+ MiItems[i].ciudad_Origen +'</td>' +
                '<td>'+ MiItems[i].ciudad_Destino +'</td>' +
                '<td>'+ MiItems[i].fecha_Vuelo +'</td>' +
                '<td>'+ MiItems[i].cantidad_Pasajeros +'</td>' +
                '<td>'+ MiItems[i].tipo_Avion +'</td>' +
                '<td>'+ MiItems[i].distancia_Km +'</td>' +
                '<td>'+
                '<button class = "btn btn-info" onclick = "CargarVuelo('+ MiItems[i].codigo_Vuelo +')">Editar Vuelo</button>'+
                '</td>'+
                '<td>'+
                '<button class = "btn btn-danger" onclick = "EliminarVuelo('+ MiItems[i].codigo_Vuelo +')">Eliminar Vuelo</button>'+
                '</td>'+
            '</tr>';
            $('#DataVuelo').html(Valores);
            }
        }
    });
}

function AgregarVuelo(){
    alert('Aviso');
    var datosVuelo = {
        codigo_Vuelo: $('#codigo_Vuelo').val(),
        ciudad_Origen: $('#ciudad_Origen').val(),
        ciudad_Destino: $('#ciudad_Destino').val(),
        fecha_Vuelo: $('#fecha_Vuelo').val(),
        cantidad_Pasajeros: $('#cantidad_Pasajeros').val(),
        tipo_Avion: $('#tipo_Avion').val(),
        distancia_Km: $('#distancia_Km').val()
    };
    var datosVueloJson = JSON.stringify(datosVuelo)

    $.ajax({
        url : UrlInsertVuelo,
        type : 'POST',
        data : datosVueloJson,
        datatype : 'JSON',
        contenttype : 'application/json',
        success : function(response){
            console.log(response);
            alert('Vuelo agregado correctamente');
        },
        error : function(textStatus, errorThrown){
            alert('Error al agregar el vuelo' + textStatus + errorThrown);
        }
    })
    alert('Aviso');
}

function CargarVuelo(codigoVuelo){
    var datosVuelo = {
        codigo_Vuelo: codigoVuelo
    };
    var datosVueloJson = JSON.stringify(datosVuelo);

    $.ajax({
        url : UrlGetVuelo,
        type : 'POST',
        data : datosVueloJson,
        dataype : 'JSON',
        contenttype : 'application/json',
        success : function(response){
            var MiItems = response;
            $('#codigo_Vuelo').val(MiItems[0].codigo_Vuelo);
            $('#ciudad_Origen').val(MiItems[0].ciudad_Origen);
            $('#ciudad_Destino').val(MiItems[0].ciudad_Destino);
            $('#fecha_Vuelo').val(MiItems[0].fecha_Vuelo);
            $('#cantidad_Pasajeros').val(MiItems[0].cantidad_Pasajeros);
            $('#tipo_Avion').val(MiItems[0].tipo_Avion);
            $('#distancia_Km').val(MiItems[0].distancia_Km);
            var btnActualizar = '<input type = "submit" id = "btn_actualizar" onclick = "ActualizarVuelo('+ MiItems[0].codigo_Vuelo +')"' + 
            'value = "Actualizar Vuelo" class = "btn btn-primary"></input>';
            $('#btnAgregarVuelo').html(btnActualizar)
        }
    })
}

function ActualizarVuelo(codigoVuelo){
    var datosVuelo = {
        codigo_Vuelo: codigoVuelo,
        ciudad_Origen:$('#ciudad_Origen').val(),
        ciudad_Destino:$('#ciudad_Destino').val(),
        fecha_Vuelo:$('#fecha_Vuelo').val(),
        cantidad_Pasajeros:$('#cantidad_Pasajeros').val(),
        tipo_Avion:$('#tipo_Avion').val(),
        distancia_Km:$('#distancia_Km').val()
    };
    var datosVueloJson = JSON.stringify(datosVuelo);

    $.ajax({
        url : UrlUpdateVuelo,
        type : 'PUT',
        data : datosVueloJson,
        datatype : 'JSON',
        contenttype : 'application/json',
        success : function(reponse){
            console.log(reponse);
            alert("Vuelo Actualizado");
        },
        error : function(textStatus, errorThrown){
            alert('Error al actualizar el vuelo' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarVuelo(codigoVuelo){
    var datosVuelo = {
        codigo_Vuelo: codigoVuelo
    };
    var datosVueloJson = JSON.stringify(datosVuelo);
    $.ajax({
        url : UrlDeleteVuelo,
        type : 'DELETE',
        data : datosVueloJson,
        dataype : 'JSON',
        contentType : 'application/json',
        success : function(reponse){
            console.log(reponse);
            alert("Vuelo eliminado correctamente");
        },
        error: function(textStatus,  errorThrown){
            alert('Error al eliminar vuelo'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
    CargarVuelos();
}