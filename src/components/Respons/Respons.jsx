
function Respons() {
  return (
    <div>
      <h1>Mon Sondage</h1>
      <p>Quelle est votre couleur préférée ?</p>
      <form>
        <label>
          <input type="radio" name="color" value="red" />
          Rouge
        </label>
        <br />
        <label>
          <input type="radio" name="color" value="blue" />
          Bleu
        </label>
        <br />
        <label>
          <input type="radio" name="color" value="green" />
          Vert
        </label>
        {/* Ajoutez d'autres options de réponse */}
      </form>
      {/* Ajoutez d'autres éléments de votre sondage */}
    </div>
  );
}

export default Respons