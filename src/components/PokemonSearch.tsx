import React, { Component } from "react";
import User from "../interfaces/User.interface";

interface SearchState {
  pokemon: Pokemon;
  error: boolean;
}

interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;

  constructor(props: User) {
    super(props);

    this.state = {
      pokemon: {
        name: "",
        numberOfAbilities: 0,
        baseExperience: 0,
        imageUrl: "",
      },
      error: false,
    };

    this.pokemonRef = React.createRef();
  }

  onSearch = () => {
    const inputVal = this.pokemonRef.current?.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputVal}`).then((res) => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then((data) => {
        this.setState({
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default,
          },
          error: false,
        });
      });
    });
  };
  render() {
    const { numberOfPokemons, name: userName } = this.props;
    const {
      error,
      pokemon: { baseExperience, imageUrl, name, numberOfAbilities },
    } = this.state;

    let resultMarkup;
 
    if (error) {
      resultMarkup = <p>Pokemon Not Found </p>;
    } else if (this.state.pokemon){
      resultMarkup = (
        <div>
          <img src={imageUrl} alt="pokemon" className="pokemono-image" />
          <p>
            {name} has {numberOfAbilities} abilities and {baseExperience} points
          </p> 
        </div>
      );
    }
    return (
      <div>
        <p>
          User {userName}{" "}
          {numberOfPokemons && <span> has {numberOfPokemons} pokemons </span>}
        </p>

        <input type="text" ref={this.pokemonRef} />
        <button onClick={this.onSearch} className="my-btn">
          Search
        </button>
        {this.state.pokemon.imageUrl && resultMarkup}
      </div>
    );
  }
}

export default PokemonSearch;
