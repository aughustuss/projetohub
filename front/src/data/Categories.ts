import { MovieGenreModel } from "models/entities/MovieGenre";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdTheaterComedy } from "react-icons/md";
import { GiCrimeSceneTape, GiJasonMask, GiBattleTank, GiLovers, GiDramaMasks, GiClassicalKnowledge, GiMusicalNotes, GiSherlockHolmes, GiTreasureMap, GiPistolGun, GiWesternHat, GiMineExplosion, GiVideoCamera } from "react-icons/gi";
import { SiAlienware } from "react-icons/si";
import { MdLocalMovies, MdFamilyRestroom } from "react-icons/md";
import { RiBearSmileFill } from "react-icons/ri";

export const AllCategories: MovieGenreModel[] = [
    { id: 1, name: "Ação", icon: GiPistolGun },
    { id: 2, name: "Aventura", icon: GiTreasureMap },
    { id: 3, name: 'Animação', icon: RiBearSmileFill },
    { id: 4, name: 'Comédia', icon: MdTheaterComedy },
    { id: 5, name: 'Crime', icon: GiCrimeSceneTape },
    { id: 6, name: 'Documentário', icon: GiVideoCamera },
    { id: 7, name: 'Drama', icon: GiDramaMasks },
    { id: 8, name: 'Família', icon: MdFamilyRestroom },
    { id: 9, name: 'Fantasia', icon: FaWandMagicSparkles },
    { id: 10, name: 'História', icon: GiClassicalKnowledge },
    { id: 11, name: 'Terror', icon: GiJasonMask },
    { id: 12, name: 'Música', icon: GiMusicalNotes },
    { id: 13, name: 'Mistério', icon: GiSherlockHolmes },
    { id: 14, name: 'Romance', icon: GiLovers },
    { id: 15, name: 'Ficção científica', icon: SiAlienware },
    { id: 16, name: 'Cinema TV', icon: MdLocalMovies },
    { id: 17, name: 'Thriller', icon: GiMineExplosion },
    { id: 18, name: 'Guerra', icon: GiBattleTank },
    { id: 19, name: 'Faroeste', icon: GiWesternHat }
]


// 0
// :
// {id: 28, name: 'Ação'}
// 1
// :
// {id: 12, name: 'Aventura'}
// 2
// :
// {id: 16, name: 'Animação'}
// 3
// :
// {id: 35, name: 'Comédia'}
// 4
// :
// {id: 80, name: 'Crime'}
// 5
// :
// {id: 99, name: 'Documentário'}
// 6
// :
// {id: 18, name: 'Drama'}
// 7
// :
// {id: 10751, name: 'Família'}
// 8
// :
// {id: 14, name: 'Fantasia'}
// 9
// :
// {id: 36, name: 'História'}
// 10
// :
// {id: 27, name: 'Terror'}
// 11
// :
// {id: 10402, name: 'Música'}
// 12
// :
// {id: 9648, name: 'Mistério'}
// 13
// :
// {id: 10749, name: 'Romance'}
// 14
// :
// {id: 878, name: 'Ficção científica'}
// 15
// :
// {id: 10770, name: 'Cinema TV'}
// 16
// :
// {id: 53, name: 'Thriller'}
// 17
// :
// {id: 10752, name: 'Guerra'}
// 18
// :
// {id: 37, name: 'Faroeste'}