
  

  export const languagesData = {
    translationRates: {
      urgentTranslation: 0.03,
      seoLocalization: 0.02
    },
    categories: [
      {
        name: 'European Languages',
        languages: [
          'British English', 'American English', 'Australian English', 'Canadian English', 'Indian English',
          'South African English', 'Irish English', 'New Zealand English', 'Scottish English', 'Welsh English',
          'Spanish', 'Belarusian', 'Catalan', 'French', 'Italian', 'German', 'Portuguese (Europe)', 'Dutch', 
          'Polish', 'Ukrainian', 'Romanian', 'Greek', 'Turkish', 'Hungarian', 'Czech', 'Slovak', 'Bulgarian',
          'Serbian', 'Croatian', 'Slovenian', 'Macedonian', 'Albanian', 'Lithuanian', 'Latvian', 'Estonian',
          'Maltese', 'Montenegrin', 'Scottish Gaelic', 'Welsh', 'Breton', 'Catalan', 'Basque', 'Bosnian', 
          'Galician', 'Asturian', 'Aragonese', 'Occitan', 'Sardinian', 'Sicilian', 'Corsican'
        ]
      },
      {
        name: 'Asian Languages',
        languages: [
          'Mandarin Chinese', 'Hindi', 'Bengali', 'Japanese', 'Korean', 'Indonesian', 'Vietnamese', 'Thai', 
          'Persian (Farsi)', 'Filipino (Tagalog)', 'Malay', 'Urdu', 'Tamil', 'Telugu', 'Marathi', 'Gujarati',
          'Kannada', 'Oriya', 'Punjabi', 'Malayalam', 'Sinhala', 'Khmer', 'Lao', 'Burmese', 'Mongolian', 
          'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azeri', 'Georgian', 'Armenian', 'Kurdish', 
          'Pashto', 'Baloch'
        ]
      },
      {
        name: 'Nordic Languages',
        languages: ['Swedish', 'Norwegian', 'Danish', 'Finnish', 'Icelandic', 'Faroese', 'Sami']
      },
      {
        name: 'African Languages',
        languages: [
          'Amharic', 'Somali', 'Tigrinya', 'Berber', 'Swahili', 'Yoruba', 'Igbo', 'Fulah (Fulani)', 
          'Lingala', 'Shona', 'Zulu', 'Xhosa', 'Nuer', 'Dinka', 'Kanuri', 'Songhay', 'San (Khoisan)', 
          'Namibian', 'Sidamo', 'Wolaita', 'Malagasy', 'Cape Verdean Creole (Kriol di Kriolu)', 'Krio (Sierra Leone)'
        ]
      },
      {
        name: 'Afro-Asian Languages',
        languages: [
          'Arabic', 'Algerian', 'Bahraini', 'Egyptian', 'Emirati', 'Iraqi', 'Jordanian', 'Kuwaiti', 
          'Lebanese', 'Libyan', 'Hassānī (Mauritanian)', 'Moroccan', 'Nigerian', 'Omani', 'Palestinian', 
          'Qatari', 'Sahrawi', 'Sudanese', 'Syrian', 'Tunisian', 'Yemeni'
        ]
      }
    ],
    rates: {
      // European Languages
        'European + European': 0.17,
        'European + Asian': 0.23,
        'European + Nordic': 0.27,
        'European + African': 0.25,
        'European + Afro-Asian': 0.19,
        // Asian Languages
        'Asian + Asian': 0.23,
        'Asian + Nordic': 0.39,
        'Asian + African': 0.35,
        'Asian + Afro-Asian': 0.38,
        'Asian + European': 0.23,
        // Nordic Languages
        'Nordic + African': 0.45,
        'Nordic + Afro-Asian': 0.39,
        'Nordic + European': 0.27,
        'Nordic + Asian': 0.39,
        'Nordic + Nordic': 0.27,
        // African Languages
        'African + African': 0.25,
        'African + Afro-Asian': 0.43,
        'African + European': 0.25,
        'African + Asian': 0.35,
        'African + Nordic': 0.45,
        // Afro-Asian Languages
        'Afro-Asian + Afro-Asian': 0.39,
        'Afro-Asian + European': 0.19,
        'Afro-Asian + Asian': 0.38,
        'Afro-Asian + Nordic': 0.39,
        'Afro-Asian + African': 0.43,
      },
  };
  