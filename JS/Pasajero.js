var UrlPasajeros = 'http://20.216.41.245:90/G6_19/controller/pasajero.php?opc=GetPasajeros';
var UrlInsertPasajero = 'http://20.216.41.245:90/G6_19/controller/pasajero.php?opc=InsertPasajero';
var UrlGetPasajero = 'http://20.216.41.245:90/G6_19/controller/pasajero.php?opc=GetPasajero';
var UrlUpdatePasajero = 'http://20.216.41.245:90/G6_19/controller/pasajero.php?opc=UpDatePasajero';
var UrlDeletePasajero = 'http://20.216.41.245:90/G6_19/controller/pasajero.php?opc=DeletePasajero';

$(document).ready(function () {
  CargarPasajeros();
});

function CargarPasajeros() {
  $.ajax({
    url: UrlPasajeros,
    type: 'GET',
    datatype: 'JSON',

    success: function (reponse) {
      var MiItems = reponse;
      var Valores = '';

      for (i = 0; i < MiItems.length; i++) {
        Valores += '<tr>' +
          '<td>' + MiItems[i].CodigoPasajero + '</td>' +
          '<td>' + MiItems[i].Nombres + '</td>' +
          '<td>' + MiItems[i].Apellidos + '</td>' +
          '<td>' + MiItems[i].FechaRegistro + '</td>' +
          '<td>' + MiItems[i].Nacionalidad + '</td>' +
          '<td>' + MiItems[i].NumeroTelefono + '</td>' +
          '<td>' + MiItems[i].Email + '</td>' +

          '<td>' +
          '<button class = "btn btn-info" onclick = "CargarPasajero(' + MiItems[i].CodigoPasajero + ')">Editar</button>' +
          '</td>' +

          '<td>' +
          '<button class = "btn btn-danger" onclick = "EliminarPasajero(' + MiItems[i].CodigoPasajero + ')">Eliminar</button>' +
          '</td>' +
          '</tr>';

        $('#DataPasajero').html(Valores);
      }
    }
  });
}

function AgregarPasajero() {
  var datospasajero = {
    CodigoPasajero: $('#CodigoPasajero').val(),
    Nombres: $('#Nombres').val(),
    Apellidos: $('#Apellidos').val(),
    FechaRegistro: $('#FechaRegistro').val(),
    Nacionalidad: $('#Nacionalidad').val(),
    NumeroTelefono: $('#NumeroTelefono').val(),
    Email: $('#Email').val()
  };

  var datospasajerojson = JSON.stringify(datospasajero);

  $.ajax({
    url: UrlInsertPasajero,
    type: 'POST',
    data: datospasajerojson,
    datatype: 'JSON',
    contenttype: 'application/json',
    success: function (reponse) {
      console.log(reponse);
      alert('Pasajero Agregado Correctamente');
    },
    error: function (textStatus, errorThrown) {
      alert('Error al Agregar un Pasajero' + textStatus + errorThrown);
    }
  });
  alert('Aviso');
}

function CargarPasajero(codigopasajero) {
  var datospasajero = {
    CodigoPasajero: codigopasajero
  };
  var datospasajerojson = JSON.stringify(datospasajero);

  $.ajax({
    url: UrlGetPasajero,
    type: 'POST',
    data: datospasajerojson,
    datatype: 'JSON',
    contenttype: 'application/json',

    success: function (reponse) {
      var MiItems = reponse;
      $('#CodigoPasajero').val(MiItems[0].CodigoPasajero);
      $('#Nombres').val(MiItems[0].Nombres);
      $('#Apellidos').val(MiItems[0].Apellidos);
      $('#FechaRegistro').val(MiItems[0].FechaRegistro);
      $('#Nacionalidad').val(MiItems[0].Nacionalidad);
      $('#NumeroTelefono').val(MiItems[0].NumeroTelefono);
      $('#Email').val(MiItems[0].Email);

      var btnactualizar = '<input type= "submit" id= "btn_actualizar" onclick= "ActualizarPasajero(' + MiItems[0].CodigoPasajero + ')"' +
        'value= "Actualizar Pasajero" class= "btn btn-primary"></input>';

      $('#btnagregarpasajero').html(btnactualizar);
    }
  });
}

function ActualizarPasajero(codigopasajero) {
  var datospasajero = {
    CodigoPasajero: codigopasajero,
    Nombres: $('#Nombres').val(),
    Apellidos: $('#Apellidos').val(),
    FechaRegistro: $('#FechaRegistro').val(),
    Nacionalidad: $('#Nacionalidad').val(),
    NumeroTelefono: $('#NumeroTelefono').val(),
    Email: $('#Email').val()
  };
  var datospasajerojson = JSON.stringify(datospasajero);

  $.ajax({
    url: UrlUpdatePasajero,
    type: 'PUT',
    data: datospasajerojson,
    datatype: 'JSON',
    contenttype: 'application/json',

    success: function (reponse) {
      console.log(reponse);
      alert("Pasajero Actualizado");
    },
    error: function (textStatus, errorThrown) {
      alert('Error al Actualizar el Pasajero' + textStatus + errorThrown);
    }
  });
  alert('Aviso');
}

function EliminarPasajero(codigopasajero) {
  var datospasajero = {
    CodigoPasajero: codigopasajero
  };
  var datospasajerojson = JSON.stringify(datospasajero);
  $.ajax({
    url: UrlDeletePasajero,
    type: 'DELETE',
    data: datospasajerojson,
    dataype: 'JSON',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
    }
  });
  alert("Pasajero Eliminado");
  CargarPasajeros();
}