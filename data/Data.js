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
        isCompleted: false,
        hint: 'When in Rome... check out the gladiators!'
      },
      { answer: 'notre_dame',
        imagePath: require('../assets/images/places/notredame.jpeg'),
        isCompleted: false,
        hint: 'A french dame. Kinda.'
      },
      { answer: 'great_wall_china',
        imagePath: require('../assets/images/places/greatwall.jpg'),
        isCompleted: false,
        hint: 'This wall can be seen from space!'
      },
      { answer: 'sydney_opera_house',
        imagePath: require('../assets/images/places/sydneyoperahouse.jpg'),
        isCompleted: false,
        hint: 'See a little culture down under.'
      },
      { answer: 'eiffel_tower',
        imagePath: require('../assets/images/places/eiffel.jpeg'),
        isCompleted: false,
        hint: 'You know this! Check your spelling.'
      },
      { answer: 'big_ben',
        imagePath: require('../assets/images/places/bigben.jpeg'),
        isCompleted: false,
        hint: 'Keeping time for London since 1859!'
      },
      { answer: 'statue_liberty',
        imagePath: require('../assets/images/places/statueofliberty.jpeg'),
        isCompleted: false,
        hint: 'You know this! Check your spelling.'
      },
      { answer: 'golden_gate',
        imagePath: require('../assets/images/places/goldengate.jpg'),
        isCompleted: false,
        hint: 'This bridge looks amazing even in the SF fog!'
      },
      { answer: 'pyramid_giza',
        imagePath: require('../assets/images/places/pyramidofgiza.jpg'),
        isCompleted: false,
        optionalAnswer: [['pyramid', 'giza'], ['great', 'pyramid']],
        hint: 'The most famous ancient Egyptian structure.'
      },
      { answer: 'taj_mahal',
        imagePath: require('../assets/images/places/tajmahal.jpg'),
        isCompleted: false,
        hint: 'World famous Indian palace.'
      }
    ]
  }
]

export const AsyncStorageData = {
  General: {
    isSoundOn: true
  },
  Game: {
    Easy: EASY,
    Medium: [],
    Hard: []
  }
}
