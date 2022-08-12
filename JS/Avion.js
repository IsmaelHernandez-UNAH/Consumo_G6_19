var UrlAviones = 'http://20.216.41.245:90/G6_19/controller/Avion.php?opc=GetAviones';
var UrlInsertAvion = 'http://20.216.41.245:90/G6_19/controller/Avion.php?opc=InsertAvion';
var UrlGetAvion = 'http://20.216.41.245:90/G6_19/controller/Avion.php?opc=GetAvion';
var UrlUpdateAvion =  'http://20.216.41.245:90/G6_19/controller/Avion.php?opc=UpDateAvion';
var UrlDeleteAvion = 'http://20.216.41.245:90/G6_19/controller/Avion.php?opc=DeleteAvion';

$(document).ready(function () {
  CargarAviones();
});

function CargarAviones() {
  $.ajax({
    url: UrlAviones,
    type: 'GET',
    datatype: 'JSON',
    success: function (reponse) {
      var MiItems = reponse;
      var Valores = '';

      for (i = 0; i < MiItems.length; i++) {
        Valores += '<tr>' +
          '<td>' + MiItems[i].Numero_Avion + '</td>' +
          '<td>' + MiItems[i].Tipo_Avion + '</td>' +
          '<td>' + MiItems[i].Hora_Vuelo + '</td>' +
          '<td>' + MiItems[i].Capacidad_pasajeros + '</td>' +
          '<td>' + MiItems[i].Fecha_Primer_vuelo + '</td>' +
          '<td>' + MiItems[i].Pais_Construccion + '</td>' +
          '<td>' + MiItems[i].Cantida_Vuelos + '</td>' +
          '<td>'+
          '<button class="btn btn-info" onclick="CargarAvion('+ MiItems[i].Numero_Avion +')">Editar</button>'+
          '</td>'+
          '<td>'+
          '<button class="btn btn-danger" onclick="EliminarAvion('+ MiItems[i].Numero_Avion +')">Eliminar</button>'+
          '</td>'+
          '</tr>';

        $('#DataAviones').html(Valores);
      }
    }
  });
}

function AgregarAvion() {
  var datosavion = {
    Numero_Avion: $('#Numero_Avion').val(),
    Tipo_Avion: $('#Tipo_Avion').val(),
    Hora_Vuelo: $('#Hora_Vuelo').val(),
    Capacidad_pasajeros: $('#Capacidad_pasajeros').val(),
    Fecha_Primer_vuelo: $('#Fecha_Primer_vuelo').val(),
    Pais_Construccion: $('#Pais_Construccion').val(),
    Cantida_Vuelos: $('#Cantida_Vuelos').val()
  };

  var datosavionjson = JSON.stringify(datosavion);

  $.ajax({
    url: UrlInsertAvion,
    type: 'POST',
    data: datosavionjson,
    datatype: 'JSON',
    contenttype: 'application/json',
    success: function (reponse) {
      console.log(reponse);
      alert('Avion Agregado Correctamente');
    },
    error: function (textStatus, errorThrown) {
      alert('Error al Agregar un Avion' + textStatus + errorThrown);
    }
  });
  alert('Aviso');
} 

function CargarAvion (NumeroAvion){
  var datosavion = {
    Numero_Avion:NumeroAvion
  }
  var datosavionjson = JSON.stringify(datosavion);

  $.ajax({
    url: UrlGetAvion,
    type: 'POST',
    data: datosavionjson,
    datatype: 'JSON',
    contenttype: 'application/json',
    success: function (reponse) {
      var MiItems = reponse;
      $('#Numero_Avion').val(MiItems[0].Numero_Avion);
      $('#Tipo_Avion').val(MiItems[0].Tipo_Avion);
      $('#Hora_Vuelo').val(MiItems[0].Hora_Vuelo);
      $('#Capacidad_pasajeros').val(MiItems[0].Capacidad_pasajeros);
      $('#Fecha_Primer_vuelo').val(MiItems[0].Fecha_Primer_vuelo);
      $('#Pais_Construccion').val(MiItems[0].Pais_Construccion);
      $('#Cantida_Vuelos').val(MiItems[0].Cantida_Vuelos);
      var btnactualizar= '<input type="submit" id="btn_actualizar" onclick= "ActualizarAvion('+ MiItems[0].Numero_Avion +')"'+
      'value="Actualizar Avion" class="btn btn-primary"></input>';
      $('#btnagregaravion').html(btnactualizar);

      
    }
  });
}


function ActualizarAvion(NumeroAvion){
  var datosavion={
    Numero_Avion:NumeroAvion,
    Tipo_Avion:$('#Tipo_Avion').val(),
    Hora_Vuelo:$('#Hora_Vuelo').val(),
    Capacidad_pasajeros:$('#Capacidad_pasajeros').val(),
    Fecha_Primer_vuelo:$('#Fecha_Primer_vuelo').val(),
    Pais_Construccion:$('#Pais_Construccion').val(),
    Cantida_Vuelos:$('#Cantida_Vuelos').val()
  };
  var datosavionjson = JSON.stringify(datosavion);

  $.ajax({
    url: UrlUpdateAvion,
    type: 'PUT',
    data: datosavionjson,
    datatype: 'JSON',
    contenttype: 'application/json',
    success: function (reponse) {
      console.log(reponse);
      alert("Avion Actualizado");
    },
    error: function(textStatus, errorThrown){
      alert('Error al actualizar el Avion'+ textStatus + errorThrown);
    }
  });
  alert('Aviso');
}


function EliminarAvion(NumeroAvion){
  var datosavion = {
    Numero_Avion: NumeroAvion
  };
  var datosavionjson = JSON.stringify(datosavion);

  $.ajax({
      url: UrlDeleteAvion,
      type: 'DELETE',
      data: datosavionjson,
      datatype: 'JSON',
      contentType: 'application/json',
      success: function (reponse){
          console.log(reponse);
          alert("Avion eliminado correctamente");
      },
      error: function(textStatus, errorThrown){
          alert('Error al eliminar Avion' + textStatus + errorThrown);
      }
  });
  alert("Aviso");
  CargarAviones();
}
