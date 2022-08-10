var UrlPasajeros = 'http://20.216.41.245:90/G6_19/controller/pasajero.php?opc=GetPasajeros';
var UrlInsertPasajero = 'http://20.216.41.245:90/G6_19/controller/pasajero.php?opc=InsertPasajero';

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