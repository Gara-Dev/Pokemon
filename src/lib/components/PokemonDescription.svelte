<script lang="ts">
  export let description;
</script>

<article class="test">
  <p class="title">Descrizione</p>
  <p class="description">{description}</p>
</article>

<style lang="scss">
  @import '/static/colors.css';
  p {
    margin:   0;
  }

  article {
    font-size: larger;
    margin-top: 2vw;
    border: 3px solid black;
    display: flex;
    flex-direction: column;
    background-color: var(--OuterCard);
    padding: 0 0.5vw;
    border-radius: 20px;
    .title {
      font-weight: bolder;
      padding: 0.2vw 0 0 1vw;
    }
    .description {
      max-width: 100%;
      background-color: var(--InnerCard);
      display: flex;
      align-items: center;
      padding: 0.5vw;
      border-radius: 20px;
    }
  }

</style>
