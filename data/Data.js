const EASY = [
  {
    name: 'Places',
    iconPath: require('../assets/images/places/eiffel.jpeg'),
    levelsComplete: 0,
    points: 0,
    savedLevel: {
      answer: null,
      points: null,
      visibleTiles: null
    },
    levels: [
      { answer: 'colosseum',
        imagePath: require('../assets/images/places/colosseum.jpeg'),
        isCompleted: false
      },
      { answer: 'notre_dame',
        imagePath: require('../assets/images/places/notredame.jpeg'),
        isCompleted: false
      },
      { answer: 'great_wall_china',
        imagePath: require('../assets/images/places/greatwall.jpg'),
        isCompleted: false
      },
      { answer: 'sydney_opera_house',
        imagePath: require('../assets/images/places/sydneyoperahouse.jpg'),
        isCompleted: false
      },
      { answer: 'eiffel_tower',
        imagePath: require('../assets/images/places/eiffel.jpeg'),
        isCompleted: false
      },
      { answer: 'big_ben',
        imagePath: require('../assets/images/places/bigben.jpeg'),
        isCompleted: false
      },
      { answer: 'statue_liberty',
        imagePath: require('../assets/images/places/statueofliberty.jpeg'),
        isCompleted: false
      },
      { answer: 'golden_gate',
        imagePath: require('../assets/images/places/goldengate.jpg'),
        isCompleted: false
      },
      { answer: 'pyramid_giza',
        imagePath: require('../assets/images/places/pyramidofgiza.jpg'),
        isCompleted: false,
        optionalAnswer: [['pyramid', 'giza'], ['great', 'pyramid']]
      },
      { answer: 'taj_mahal',
        imagePath: require('../assets/images/places/tajmahal.jpg'),
        isCompleted: false
      }
    ]
  }
]

export const AsyncStorageData = {
  General: {
    atLeastOneGameStarted: false
  },
  Game: {
    Easy: EASY,
    Medium: [],
    Hard: []
  }
}
