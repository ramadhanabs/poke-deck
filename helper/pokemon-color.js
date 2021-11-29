export default function pokemonColor(type) {
  switch (type) {
    case 'grass':
      return 'bg-green-400';
    case 'fire':
      return 'bg-red-400';
    case 'fighting':
      return 'bg-red-400';
    case 'bug':
      return 'bg-yellow-500';
    case 'shadow':
      return 'bg-gray-600';
    case 'electric':
      return 'bg-yellow-300';
    case 'poison':
      return 'bg-indigo-400';
    case 'rock':
      return 'bg-gray-500';
    case 'ground':
      return 'bg-yellow-500';
    case 'steel':
      return 'bg-gray-600';
    case 'dark':
      return 'bg-gray-600';
    case 'dragon':
      return 'bg-red-400';
    case 'ghost':
      return 'bg-indigo-400';
    case 'psychic':
      return 'bg-indigo-400';
    case 'unknown':
      return 'bg-gray-500';
    default:
      return 'bg-blue-400';
  }
}
