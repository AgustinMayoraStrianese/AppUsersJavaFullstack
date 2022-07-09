// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#usuarios').DataTable();
  actualizarEmailDelUsuario();
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}

async function cargarUsuarios() {
      const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
      });
      const usuarios = await request.json();

      let listadoHtml = '';
      for(let usuario of usuarios) {
      let {id, nombre, apellido, email, telefono} = usuario;

        let telefon = usuario.telefono == null ? "-" : usuario.telefono;
        let usuarioHtml = `
         <tr>
              <td>${id}</td>
              <td>${nombre} ${apellido}</td>
              <td>${email}</td>
              <td>${telefon}</td>
              <td>
                  <a href="#" onClick=eliminarUsuario(${id}) class="btn btn-danger btn-circle btn-sm">
                      <i class="fas fa-trash"></i>
                  </a>
              </td>
         </tr>
        `;

      listadoHtml+= usuarioHtml;
      }

      console.log(usuarios);

      document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
}


async function eliminarUsuario(id) {

    if (!confirm('¿Desea eliminar este usuario?')) {
        return;
    }

    const request = await fetch(`api/usuarios/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

    location.reload();
}
