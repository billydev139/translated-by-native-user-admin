
  

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
      'European + European': 0.12,
      'European + Asian': 0.18,
      'European + Nordic': 0.22,
      'European + African': 0.20,
      'European + Afro-Asian': 0.14,
      // Asian Languages
      'Asian + Asian': 0.18,
      'Asian + Nordic': 0.34,
      'Asian + African': 0.30,
      'Asian + Afro-Asian': 0.33,
      'Asian + European': 0.18,
      // Nordic Languages
      'Nordic + African': 0.40,
      'Nordic + Afro-Asian': 0.34,
      'Nordic + European': 0.22,
      'Nordic + Asian': 0.34,
      'Nordic + Nordic': 0.22,
      // African Languages
      'African + African': 0.20,
      'African + Afro-Asian': 0.38,
      'African + European': 0.20,
      'African + Asian': 0.30,
      'African + Nordic': 0.40,
      // Afro-Asian Languages
      'Afro-Asian + Afro-Asian': 0.34,
      'Afro-Asian + European': 0.14,
      'Afro-Asian + Asian': 0.33,
      'Afro-Asian + Nordic': 0.34,
      'Afro-Asian + African': 0.38  
      },
  };
  