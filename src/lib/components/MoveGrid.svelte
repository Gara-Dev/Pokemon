<script lang="ts">
	import type { Move } from "$lib/types/Move";

  export let moves: Move[]
</script>

<article>
  <table>
      <tbody>
        <tr>
          <td>Lvl</td>
          <td>Nome</td>
          <td>Tipo</td>
          <td>Categoria</td>
          <td>Potenza</td>
          <td>Precisione</td>
          <td>PP</td>
        </tr>
        {#each moves as move}
        <tr>
          <td>{move.lvl}</td>
          <td>{move.nome}</td>
          <td>{move.tipo}</td>
          <td>{move.categoria}</td>
          <td>{move.potenza}</td>
          <td>{move.precisione}</td>
          <td>{move.PP}</td>
        </tr>
        {/each}
      </tbody>
  </table>
</article>

<style lang="scss">
  article {
    display: flex;
    align-items: center;
    justify-content: center;
  table {
      margin-top: 2vw;
      font-size: larger;
      border-collapse: collapse;
      tr {
        td {
          border: 3px solid black;
          padding: 1vw;
          text-align: center;
        }
      }
    }
  }
</style>
