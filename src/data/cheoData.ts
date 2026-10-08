import { CheoRole, GameCard, CheoInstrument, CheoKnowledgeItem, Achievement } from '../types';

export const CHEO_ROLES: CheoRole[] = [
  {
    id: 'thi_mau',
    name: 'Thị Mầu',
    alias: 'Cô Mầu làng ta',
    category: 'dao',
    categoryLabel: 'Đào lẳng',
    archetype: 'Đào lẳng',
    description: 'Con gái phú ông, tính tình phóng túng, táo bạo, dám vượt qua lễ giáo phong kiến để theo đuổi tình yêu và khát vọng sống tự do.',
    personality: 'Sôi nổi, lẳng lơ duyên dáng, thông minh, không sợ dư luận.',
    signaturePhrase: '“Người ta hoa đất, ai lại phụ tấm lòng người thế này bao giờ!”',
    signatureMelody: 'Làn điệu Lới Lơ & Đào Liễu',
    playExcerpt: 'Vở chèo cổ: Quan Âm Thị Kính (Cảnh Thị Mầu lên chùa)',
    avatarColor: 'from-rose-900 to-amber-700',
    icon: '🌸',
    difficulty: 'Dễ',
    gameAbility: {
      name: 'Nụ Cười Hoa Liễu',
      description: 'Quyến rũ sân đình: Hoán đổi 1 thẻ Manh Mối với người chơi khác hoặc nhận thêm 2 điểm Tâm Điểm.',
      cooldownRounds: 2
    },
    secretObjective: 'Tìm đủ 3 manh mối chứng minh sự thanh bạch của lòng mình hoặc tích luỹ nhiều điểm Tâm Điểm nhất.',
    culturalInsight: 'Trong văn hóa chèo, vai Đào lẳng như Thị Mầu là biểu tượng trần tục rực rỡ, đối lập với sự thoát tục nhẫn nhục của Đào thương Thị Kính.'
  },
  {
    id: 'thi_kinh',
    name: 'Thị Kính',
    alias: 'Tiểu Kính Tâm',
    category: 'dao',
    categoryLabel: 'Đào thương',
    archetype: 'Đào thương',
    description: 'Người phụ nữ hiền thục, nết na, chịu nỗi oan giết chồng rồi oan dan díu với Thị Mầu. Đại diện cho đức hy sinh và lòng từ bi vô lượng.',
    personality: 'Trầm tĩnh, nhẫn nhục, bao dung, thấu suốt lẽ đời.',
    signaturePhrase: '“Thôi thì trăm nỗi oan khiên, con xin nguyện gánh để cứu một sinh linh vô tội...”',
    signatureMelody: 'Làn điệu Sa Lệch Chênh & Hát Cách',
    playExcerpt: 'Vở chèo cổ: Quan Âm Thị Kính',
    avatarColor: 'from-amber-950 to-stone-800',
    icon: '🪷',
    difficulty: 'Trung bình',
    gameAbility: {
      name: 'Nhẫn Nhục Chờ Thời',
      description: 'Lòng từ bi: Hóa giải một biến cố xấu của sân đình hoặc bảo vệ điểm Uy Tín của một người chơi bất kỳ.',
      cooldownRounds: 2
    },
    secretObjective: 'Bảo vệ được 2 người chơi khác khỏi mất Uy Tín và giải mã được bức sớ oan khuất.',
    culturalInsight: 'Đào thương đòi hỏi diễn viên phải thể hiện nội tâm giằng xé qua ánh mắt rủ và dáng đi khép nép, biểu cảm bằng tiếng nấc nghẹn ngào.'
  },
  {
    id: 'he_gay',
    name: 'Hề Gậy',
    alias: 'Thầy Hề chốn đình trung',
    category: 'he',
    categoryLabel: 'Hề áo ngắn',
    archetype: 'Hề áo ngắn',
    description: 'Người hầu nghèo khổ, tay cầm cây gậy tre vót nhọn, đại diện cho trí tuệ và tiếng cười lạc quan, châm biếm thói hư tật xấu của quan lại phong kiến.',
    personality: 'Hóm hỉnh, sắc bén, dũng cảm, hay nói móc nhưng đầy tình người.',
    signaturePhrase: '“Tôi là chú Hề gậy, lưng còng vai vác... Ai mua dưa mà bán gậy!”',
    signatureMelody: 'Làn điệu Hề Mồi & Sắp Qua Cầu',
    playExcerpt: 'Trích đoạn Hề Gậy gác cổng - Hề theo hầu Thầy Đồ',
    avatarColor: 'from-emerald-900 to-teal-950',
    icon: '🎋',
    difficulty: 'Dễ',
    gameAbility: {
      name: 'Gậy Đòn Châm Biếm',
      description: 'Tiếng cười dân gian: Làm lộ tẩy vai diễn của 1 người chơi hoặc vô hiệu hoá một hiệu ứng quyền lực của Xã Trưởng.',
      cooldownRounds: 1
    },
    secretObjective: 'Thu thập đủ 3 chứng cứ về sự giả tạo của tầng lớp chức dịch và kích hoạt tiếng cười dân làng.',
    culturalInsight: 'Hề gậy có quyền năng phá vỡ bức tường thứ tư, trực tiếp trò chuyện với khán giả ngoài chiếu và lật ngược tình thế kịch tính.'
  },
  {
    id: 'xa_truong',
    name: 'Xã Trưởng',
    alias: 'Quan cụ lý hình',
    category: 'lao',
    categoryLabel: 'Lão vãn / Cường hào',
    archetype: 'Lão ác trào phúng',
    description: 'Người đứng đầu việc làng, luôn hống hách coi thường thứ dân, tham lam, thích nịnh hót nhưng dốt nát và háo sắc.',
    personality: 'Hách dịch, hám danh, sợ vợ, tham tiền, dễ bị lừa gạt.',
    signaturePhrase: '“Làng này từ cổ chí kim, phép vua còn thua lệ làng! Đem trói lại cho ta!”',
    signatureMelody: 'Hát Nói & Điệu Rắp Trào Phúng',
    playExcerpt: 'Vở chèo cổ: Xã Trưởng - Mẹ Đốp',
    avatarColor: 'from-red-950 to-orange-950',
    icon: '📜',
    difficulty: 'Thử thách',
    gameAbility: {
      name: 'Lệnh Phạt Làng',
      description: 'Uy quyền phong kiến: Ép 1 người chơi phải rút thêm thẻ Thách Thức hoặc tịch thu 1 điểm Uy Tín.',
      cooldownRounds: 2
    },
    secretObjective: 'Giữ được nhiều điểm Uy Tín nhất trước khi hạ màn và giấu kín tập sổ làng.',
    culturalInsight: 'Nhân vật Xã Trưởng bị nghệ thuật chèo biếm họa sâu sắc qua bộ râu dê vểnh ngược và bước chân nghênh ngang khập khiễng.'
  },
  {
    id: 'me_dop',
    name: 'Mẹ Đốp',
    alias: 'Vợ thầy mõ làng',
    category: 'mu',
    categoryLabel: 'Mụ đốp / Nữ hoạt kê',
    archetype: 'Mụ hài dân gian',
    description: 'Vợ anh Mõ làng, lanh lợi, miệng lưỡi sắc sảo, không sợ quan chức làng xã, luôn dùng mưu mẹo để biến Xã Trưởng thành trò cười.',
    personality: 'Đanh đá, thông minh vượt bậc, ứng biến nhanh, đầy bản lĩnh.',
    signaturePhrase: '“Mẹ Đốp con chẳng dám chửa, chẳng qua ăn ốc đổ vỏ cho thầy mà thôi!”',
    signatureMelody: 'Làn điệu Hát Cách & Lới Lơ nhại giọng',
    playExcerpt: 'Trích đoạn kinh điển: Xã Trưởng - Mẹ Đốp',
    avatarColor: 'from-purple-950 to-pink-900',
    icon: '🪘',
    difficulty: 'Trung bình',
    gameAbility: {
      name: 'Gõ Mõ Loan Tin',
      description: 'Miệng lưỡi sắc như dao: Tiết lộ thẻ trên cùng của cọc bài cho mọi người và cộng điểm cho phe yếu hơn.',
      cooldownRounds: 1
    },
    secretObjective: 'Làm bẽ mặt Xã Trưởng ít nhất 2 lần và thu thập manh mối tiếng mõ đêm rằm.',
    culturalInsight: 'Mẹ Đốp là hiện thân của phụ nữ lao động bình dân Bắc Bộ dám dùng trí tuệ đối đầu với cường quyền bất công.'
  },
  {
    id: 'dao_hue',
    name: 'Đào Huế',
    alias: 'Cô đào xứ Huế',
    category: 'dao',
    categoryLabel: 'Đào pha',
    archetype: 'Đào pha sắc sảo',
    description: 'Người phụ nữ từ miền Trung lặn lội ra Bắc tìm chồng phụ bạc, màn đánh ghen bằng lý lẽ, văn hóa và khí phách khiến kẻ trăng hoa bẽ bàng.',
    personality: 'Cương trực, tài hoa, giàu tình nghĩa nhưng dứt khoát, không quỵ lụy.',
    signaturePhrase: '“Vợ chồng một đạo can thường, chàng sao nỡ dứt tơ vương mà đi!”',
    signatureMelody: 'Làn điệu Đường Trường Duyên Phận & Tứ Quý',
    playExcerpt: 'Vở chèo cổ: Tuần Ty Đào Huế',
    avatarColor: 'from-indigo-950 to-blue-900',
    icon: '🪭',
    difficulty: 'Thử thách',
    gameAbility: {
      name: 'Vung Quạt Phân Minh',
      description: 'Lý lẽ đanh thép: Buộc 2 người chơi phải công khai 1 thẻ Manh Mối của mình.',
      cooldownRounds: 2
    },
    secretObjective: 'Vạch trần bí mật bội ước và tích lũy bộ thẻ Duyên Phận.',
    culturalInsight: 'Đào Huế là nhân vật Đào pha độc đáo trong chèo: vừa có chất bi thương của người vợ bị phụ, vừa có chất hùng sắc sảo.'
  },
  {
    id: 'sung_ba',
    name: 'Sùng Bà',
    alias: 'Bà mẹ chồng cay nghiệt',
    category: 'mu',
    categoryLabel: 'Mụ ác',
    archetype: 'Mụ ác gia trưởng',
    description: 'Mẹ của Thiện Sĩ, tiêu biểu cho tầng lớp địa chủ cay nghiệt, hẹp hòi, áp đặt con cái và vu oan cho Thị Kính cầm dao giết chồng.',
    personality: 'Dữ dằn, đa nghi, hống hách, độc đoán, trọng nam khinh nữ.',
    signaturePhrase: '“Giống nhà mày là giống cỏ rác! Dâu dữ thì con ta đuổi!”',
    signatureMelody: 'Hát Rắp dữ dằn & Điệu Sử ngâm cay độc',
    playExcerpt: 'Vở chèo cổ: Quan Âm Thị Kính (Cảnh Mắc oan)',
    avatarColor: 'from-stone-900 to-red-950',
    icon: '🗡️',
    difficulty: 'Trung bình',
    gameAbility: {
      name: 'Án Oan Bất Ngờ',
      description: 'Vu cáo: Khiến 1 người chơi mất lượt trong round hiện tại hoặc giảm 2 điểm Tâm Điểm.',
      cooldownRounds: 3
    },
    secretObjective: 'Duy trì trật tự gia phong và phong tỏa thẻ giải oan cho đến vòng 4.',
    culturalInsight: 'Vai Mụ ác đòi hỏi lối hát gằn giọng, điệu bộ xỉa xói bằng ngón trỏ và ánh mắt sắc lẹm đặc trưng trong nghệ thuật chèo.'
  }
];

export const GAME_SCENARIOS = [
  {
    id: 'scen_quan_am',
    name: 'Vụ Án Chiếu Chèo: Chiếc Hài Hoa Trước Cửa Chùa',
    description: 'Đêm rằm tháng Bảy tại chùa Diên Hựu, một đứa trẻ sơ sinh bị bỏ lại cùng chiếc quạt lụa thêu hoa sen. Dân làng xôn xao quy tội cho Tiểu Kính Tâm và cô Mầu...',
    mystery: 'Ai là người thực sự để lại manh mối đứa bé, và chiếc hài hoa thêu chỉ kim tuyến thuộc về ai?',
    cluesTarget: 4
  },
  {
    id: 'scen_me_dop',
    name: 'Đêm Đình Làng: Tiếng Mõ Kêu Oan Giữa Canh Ba',
    description: 'Xã Trưởng chuẩn bị mở tiệc ăn khao chức sắc thì con dấu làng bỗng biến mất. Mẹ Đốp tay cầm mõ tre đứng giữa sân đình cười ẩn ý...',
    mystery: 'Ai đã giấu con dấu đồng của làng dưới đáy trống chèo để vạch mặt thói tham nhũng?',
    cluesTarget: 3
  },
  {
    id: 'scen_tuan_ty',
    name: 'Quán Trọ Đêm Trăng: Khí Phách Nàng Đào Xứ Huế',
    description: 'Quan Tuần Ty đang mải mê cùng tiểu thiếp tại quán trọ ven đê thì Đào Huế tìm tới mang theo chiếc quạt rách và nửa bức trâm vàng thề nguyện...',
    mystery: 'Manh mối nào chứng minh sự phản bội của Tuần Ty trước khi trời rạng sáng?',
    cluesTarget: 4
  }
];

export const GAME_CARDS: GameCard[] = [
  // Manh Mối (Clues)
  {
    id: 'clue_01',
    type: 'clue',
    title: 'Chiếc Quạt Lụa Thêu Sen',
    subtitle: 'Manh mối hiện trường',
    description: 'Một chiếc quạt lụa nan trúc vương lại trên thềm đá, thoang thoảng mùi phấn nụ.',
    lore: 'Trong chèo, chiếc quạt là đạo cụ vạn năng: gấp lại là bút, mở ra là gương, che mặt là e thẹn.',
    points: 15,
    actionType: 'reveal_clue'
  },
  {
    id: 'clue_02',
    type: 'clue',
    title: 'Mảnh Vải Nâu Sồng Rách',
    subtitle: 'Dấu vết nhẫn nhục',
    description: 'Mảnh áo nhà chùa vướng nơi hàng rào trúc, thấm đẫm sương đêm.',
    lore: 'Áo nâu sồng là trang phục ước lệ của người tu hành hoặc vai Đào thương chịu oan khiên.',
    points: 10,
    actionType: 'reveal_clue'
  },
  {
    id: 'clue_03',
    type: 'clue',
    title: 'Tiếng Trống Đế Lỗi Nhịp',
    subtitle: 'Lời thì thầm dàn nhạc',
    description: 'Bác đánh trống đế gõ chệch một nhịp "cắc" khi nhân vật xưng danh bước ra.',
    lore: 'Trống đế trong chèo vừa giữ nhịp, vừa khen ngợi, chê bai hoặc đỡ giọng cho đào kép.',
    points: 12,
    actionType: 'prestige_boost'
  },
  {
    id: 'clue_04',
    type: 'clue',
    title: 'Tập Sổ Thu Phạt Của Xã Trưởng',
    subtitle: 'Chứng cứ vụ lợi',
    description: 'Quyển sổ ghi tiền phạt vạ của làng có những trang bị xé dở một cách đáng ngờ.',
    lore: 'Lệ phạt vạ trong làng xã cổ xưa thường được sân khấu chèo biến thành đề tài châm biếm sâu sắc.',
    points: 18,
    actionType: 'reveal_clue'
  },
  {
    id: 'clue_05',
    type: 'clue',
    title: 'Cây Gậy Tre Vót Nhọn Của Chú Hề',
    subtitle: 'Vật chứng dân gian',
    description: 'Cây gậy tre mòn bóng theo chú hề đi khắp làng, có khắc một ký hiệu bí mật.',
    lore: 'Cây gậy của chú hề tượng trưng cho công lý của người nghèo, khi cần biến thành súng, dao, hay thước đo.',
    points: 14,
    actionType: 'swap_seat'
  },
  {
    id: 'clue_06',
    type: 'clue',
    title: 'Nửa Chiếc Trâm Vàng Ước Hẹn',
    subtitle: 'Bằng chứng tình duyên',
    description: 'Nửa chiếc trâm đồng mạ vàng khắc chữ Duyên rơi bên gối chiếu.',
    lore: 'Ước lệ chèo dùng nửa kỷ vật để biểu đạt cảnh chia ly, phản bội và sự đợi chờ thủy chung.',
    points: 16,
    actionType: 'reveal_clue'
  },

  // Làn Điệu Chèo (Melody Challenges)
  {
    id: 'mel_01',
    type: 'melody',
    title: 'Làn Điệu Lới Lơ',
    subtitle: 'Giai điệu tình tứ phóng khoáng',
    description: 'Làn điệu trữ tình, nhịp điệu rộn ràng của Thị Mầu khi bộc lộ khát vọng tuổi trẻ.',
    lore: '“Lới lơ” là làn điệu chèo kinh điển thể hiện tâm trạng phơi phới, rạo rực yêu đương.',
    points: 20,
    audioKey: 'dao_lieu',
    melodyInfo: {
      melodyName: 'Điệu Lới Lơ (Hệ thống điệu Sa)',
      tempo: 'Vừa phải, dập dồn tình cảm',
      emotion: 'Đắm say, mời gọi, khao khát tự do',
      sampleLyrics: '“Thầy như quả táo trên cây... Con như đứa trẻ dãi dề ước ao...”'
    }
  },
  {
    id: 'mel_02',
    type: 'melody',
    title: 'Làn Điệu Hề Mồi',
    subtitle: 'Tiếng cười trào lộng dân gian',
    description: 'Giai điệu giòn giã kèm điệu múa mồi đèn dầu khi chú hề bước ra xưng danh.',
    lore: 'Hề mồi xưng danh luôn bắt đầu bằng câu thơ lục bát dí dỏm cùng tiếng trống cắc tùng rộn rã.',
    points: 20,
    audioKey: 'he_moi',
    melodyInfo: {
      melodyName: 'Điệu Hề Mồi Cuốn Hỏa',
      tempo: 'Nhanh, ngắt nhịp hóm hỉnh',
      emotion: 'Hài hước, châm biếm, hoạt bát',
      sampleLyrics: '“Tôi ra đây có phải xưng danh không nhỉ? Không xưng danh thì ai biết là ai!”'
    }
  },
  {
    id: 'mel_03',
    type: 'melody',
    title: 'Làn Điệu Sa Lệch Chênh',
    subtitle: 'Nỗi niềm trầm lắng u hoài',
    description: 'Làn điệu than thở ai oán của Thị Kính khi bước chân vào cổng chùa gánh vác oan tình.',
    lore: 'Sa lệch chênh là làn điệu đỉnh cao diễn tả sự cô đơn, cam chịu và nỗi niềm trắc ẩn sâu thẳm.',
    points: 22,
    audioKey: 'dao_lieu',
    melodyInfo: {
      melodyName: 'Điệu Sa Lệch Chênh',
      tempo: 'Chậm rãi, ngân nga da diết',
      emotion: 'Ai oán, thanh thản, từ bi',
      sampleLyrics: '“Gió vàng hiu hắt đêm đông... Giọt châu lã chã giọt sầu chứa chan...”'
    }
  },
  {
    id: 'mel_04',
    type: 'melody',
    title: 'Làn Điệu Đào Liễu',
    subtitle: 'Vẻ đẹp dịu dàng thiếu nữ Bắc Bộ',
    description: 'Làn điệu mượt mà ca ngợi nét duyên dáng, e ấp của người con gái làng quê.',
    lore: 'Đào liễu thường được hát khi nhân vật nữ giãi bày tâm tư hoặc dạo bước ngắm cảnh xuân.',
    points: 20,
    audioKey: 'dao_lieu',
    melodyInfo: {
      melodyName: 'Điệu Đào Liễu (Hệ điệu Vãn)',
      tempo: 'Nhẹ nhàng, thướt tha',
      emotion: 'Thanh lịch, hoài niệm, duyên dáng',
      sampleLyrics: '“Đào liễu có một mình... Xanh xanh mướt mướt đượm tình làng thôn...”'
    }
  },

  // Câu Đố / Thách Thức Văn Hóa (Quiz)
  {
    id: 'quiz_01',
    type: 'quiz',
    title: 'Ước Lệ Quạt Chèo',
    subtitle: 'Hỏi đáp sân khấu cổ truyền',
    description: 'Tìm hiểu ngôn ngữ hình thể và đạo cụ vạn năng của nghệ thuật chèo.',
    lore: 'Quạt chèo không đơn thuần để quạt mát mà là ngôn ngữ sân khấu biểu trưng kỳ diệu.',
    points: 25,
    quizQuestion: {
      question: 'Khi diễn viên chèo cầm quạt khép hờ, đưa lên che ngang miệng và cười liếc mắt, động tác này biểu thị điều gì?',
      options: [
        'Sự e thẹn duyên dáng hoặc sự lúng liếng lẳng lơ của vai Đào',
        'Cơn tức giận của vai Mụ ác chuẩn bị chửi rủa',
        'Hành động che giấu mưu kế của viên Xã Trưởng',
        'Tín hiệu xin dừng vở diễn với người đánh trống đế'
      ],
      correctIndex: 0,
      explanation: 'Trong nghệ thuật chèo, chiếc quạt che nửa miệng kết hợp ánh mắt lúng liếng là động tác đặc trưng của vai Đào lẳng hoặc thiếu nữ e lệ.'
    }
  },
  {
    id: 'quiz_02',
    type: 'quiz',
    title: 'Tiếng "Đế" Sân Đình',
    subtitle: 'Tương tác nghệ thuật độc nhất vô nhị',
    description: 'Văn hóa tương tác giữa khán giả và diễn viên trong không gian đình làng.',
    lore: 'Chèo là nghệ thuật cởi mở, không có rào cản ngăn cách người xem và người diễn.',
    points: 25,
    quizQuestion: {
      question: 'Trong nghệ thuật chèo truyền thống, "Tiếng Đế" là gì?',
      options: [
        'Tiếng nhạc cụ thổi bằng sừng trâu báo hiệu hết giờ diễn',
        'Lời đối đáp, hưởng ứng hoặc chất vấn của khán giả / dàn nhạc với diễn viên',
        'Chiếc bệ gỗ nâng cao sân khấu để diễn viên đứng lên',
        'Kỹ thuật gõ đế giày tạo âm thanh nhịp nhàng'
      ],
      correctIndex: 1,
      explanation: 'Tiếng đế là nét độc đáo bậc nhất của Chèo: khi diễn viên ra xưng danh ("Tôi là..."), người đánh trống hoặc khán giả liền đế theo ("Ai đấy?", "Phải chăng?"), xóa nhòa ranh giới giữa sân khấu và cuộc đời.'
    }
  },
  {
    id: 'quiz_03',
    type: 'quiz',
    title: 'Tứ Đại Kiệt Tác Chèo Cổ',
    subtitle: 'Di sản văn hóa nghìn năm',
    description: 'Những kiệt tác chèo mẫu mực hun đúc tâm hồn người Việt qua nhiều thế hệ.',
    lore: 'Nghệ thuật chèo cổ lưu giữ những giá trị nhân văn sâu sắc về đạo hiếu, tình vợ chồng và nghĩa khí.',
    points: 25,
    quizQuestion: {
      question: 'Vở chèo cổ nào sau đây nổi tiếng với nhân vật Súy Vân giả dại vì tình duyên trắc trở?',
      options: [
        'Quan Âm Thị Kính',
        'Lưu Bình Dương Lễ',
        'Kim Nham',
        'Trương Viên'
      ],
      correctIndex: 2,
      explanation: 'Trích đoạn "Súy Vân giả dại" trong vở chèo Kim Nham là đỉnh cao mẫu mực của nghệ thuật múa hát và diễn xuất nội tâm trong chèo cổ Việt Nam.'
    }
  },
  {
    id: 'quiz_04',
    type: 'quiz',
    title: 'Nhịp Trống Chỉ Huy',
    subtitle: 'Nhạc cụ linh hồn sân khấu',
    description: 'Vị trí tối thượng của trống chèo trong việc điều tiết toàn bộ vở diễn.',
    lore: 'Người đánh trống chèo được ví như đạo diễn vô hình của cả đêm diễn sân đình.',
    points: 25,
    quizQuestion: {
      question: 'Nhạc cụ nào giữ vai trò chỉ huy nhịp độ, dẫn dắt diễn viên bước đi và biểu cảm trong chèo?',
      options: [
        'Đàn Tam Thập Lục',
        'Sáo Trúc ngang',
        'Trống Chèo (đặc biệt là Trống Đế)',
        'Thanh La đồng'
      ],
      correctIndex: 2,
      explanation: 'Trống Chèo và Trống Đế là linh hồn của dàn nhạc: tiếng "tùng" nâng đỡ câu hát, tiếng "cắc" nhấn mạnh hành động kịch, dẫn dắt toàn bộ diễn biến sân khấu.'
    }
  },

  // Biến Cố Sân Đình (Events)
  {
    id: 'evt_01',
    type: 'event',
    title: 'Dân Làng Vỗ Tay Tán Thưởng',
    subtitle: 'Đêm diễn thăng hoa',
    description: 'Một tràng pháo tay ròn rã vang lên từ góc cây đa. Tất cả người chơi nhận thêm 5 điểm Tâm Điểm!',
    lore: 'Chiếu chèo giữa sân đình ấm cúng bởi chính tình yêu nghệ thuật mộc mạc của bà con thôn làng.',
    points: 5,
    actionType: 'prestige_boost'
  },
  {
    id: 'evt_02',
    type: 'event',
    title: 'Gió Đêm Trăng Thổi Tắt Đèn Lồng',
    subtitle: 'Hồi hộp sân đình',
    description: 'Ngọn đèn dầu bấc lay lắt, các vai diễn phải tạm dừng 1 nhịp để chỉnh lại xiêm y.',
    lore: 'Thời xưa, chiếu chèo thắp sáng bằng đèn dầu lạc hoặc đuốc tre, tạo nên vẻ mờ ảo huyền bí.',
    points: 5,
    actionType: 'block_rival'
  }
];

export const CHEO_INSTRUMENTS: CheoInstrument[] = [
  {
    id: 'trong_cheo',
    name: 'Trống Chèo & Trống Đế',
    type: 'Gõ',
    description: 'Bộ trống chỉ huy tối thượng gồm trống cái giữ nhịp cái và trống đế nhỏ hai dùi gõ vào tang trống tạo âm thanh "tùng - cắc" lanh lảnh.',
    roleInOrchestra: 'Chỉ đạo diễn xuất, bắt nhịp câu hát, đế khen chê diễn viên và tạo kịch tính dồn dập cho các cảnh cao trào.',
    culturalNote: 'Tay trống đế giỏi phải hiểu lòng diễn viên như tri âm tri kỷ: khi diễn viên hụt hơi, tiếng trống lập tức đệm đỡ.',
    soundType: 'drum'
  },
  {
    id: 'dan_nhi',
    name: 'Đàn Nhị (Đàn Cò)',
    type: 'Dây',
    description: 'Nhạc cụ hai dây kéo bằng cung vĩ luồn giữa hai dây, bầu đàn bịt da trăn tạo chất âm réo rắt, truyền cảm như giọng người.',
    roleInOrchestra: 'Đi bè giai điệu chính cùng giọng hát đào kép, thể hiện tuyệt vời các làn điệu ai oán, u sầu hoặc trữ tình thiết tha.',
    culturalNote: 'Tiếng nhị trong chèo như tiếng than thở của thân phận phụ nữ thời xưa chịu nhiều cay đắng thiệt thòi.',
    soundType: 'erhu'
  },
  {
    id: 'dan_nguyet',
    name: 'Đàn Nguyệt (Đàn Kìm)',
    type: 'Dây',
    description: 'Thùng đàn hình tròn như mặt trăng rằm, cần đàn dài gắn các phím cao cho phép diễn viên nhấn nhá các nốt rung, vuốt độc đáo.',
    roleInOrchestra: 'Dẫn dắt các điệu kể chuyện, hát cách, mang lại màu sắc đĩnh đạc, sang trọng và ấm áp cho không gian đình làng.',
    culturalNote: 'Âm sắc đàn nguyệt biểu trưng cho vầng trăng chiếu rọi đêm diễn, thanh tao và trầm mặc.',
    soundType: 'moon'
  },
  {
    id: 'sao_truc',
    name: 'Sáo Trúc',
    type: 'Hơi',
    description: 'Ống sáo làm từ tre hoặc trúc vùng rừng núi Bắc Bộ, âm thanh vút cao thanh thoát như tiếng chim rừng giữa đồng quê.',
    roleInOrchestra: 'Tạo không gian dẫn nhập, mô tả cảnh thiên nhiên làng mạc, chùa chiền thanh tịnh hoặc mùa xuân tươi vui.',
    culturalNote: 'Tiếng sáo trúc mở đầu vở diễn như làn gió mát xua tan mệt nhọc sau ngày mùa vất vả của nông dân.',
    soundType: 'flute'
  },
  {
    id: 'dan_tam_thap_luc',
    name: 'Đàn Tam Thập Lục',
    type: 'Dây',
    description: 'Đàn 36 dây gõ bằng hai que tre mềm, âm thanh trong vắt róc rách như dòng suối chảy qua khe đá.',
    roleInOrchestra: 'Tô điểm các hoa mỹ âm, làm dày dặn giai điệu của các điệu múa quạt, điệu lới lơ rộn rã.',
    culturalNote: 'Giúp âm hưởng sân khấu trở nên lấp lánh, tươi vui trong những cảnh hội làng nhộn nhịp.',
    soundType: 'bell'
  },
  {
    id: 'phach_tre_thanh_la',
    name: 'Phách Tre & Thanh La',
    type: 'Gõ',
    description: 'Bản phách bằng gỗ mun hoặc tre già gõ bằng hai con phách, cùng đĩa đồng thanh la tạo âm thanh kim khí sắc lạnh.',
    roleInOrchestra: 'Giữ nhịp vững chắc cho các làn điệu hát nói, báo hiệu cảnh bắt trói, quan xử kiện hoặc tiếng cười hề nhại giọng.',
    culturalNote: 'Âm thanh thanh la vang xa báo hiệu cho cả làng biết hội chèo đã bắt đầu lên đèn.',
    soundType: 'wood'
  }
];

export const CHEO_KNOWLEDGE_BASE: CheoKnowledgeItem[] = [
  {
    id: 'kb_art_identity',
    category: 'art',
    title: 'Hồn Cốt Nghệ Thuật Chèo Sân Đình',
    subtitle: 'Nguồn gốc và bản sắc văn hóa vùng châu thổ Bắc Bộ',
    summary: 'Chèo là loại hình kịch hát dân gian bắt nguồn từ thế kỷ thứ 10 dưới thời Đinh - Tiền Lê, gắn liền với hội hè và đời sống nông nghiệp lúa nước.',
    content: [
      'Không gian nguyên thủy của chèo là chiếc chiếu cói trải giữa sân đình, ba mặt là khán giả quây quần xung quanh, diễn viên bước ra từ cửa hậu đình.',
      'Tính ước lệ và cách điệu là nguyên tắc sống còn: Một bước đi vòng tròn là ngàn dặm đường trường, chiếc quạt tre che ngang là bức rèm the e ấp.',
      'Chèo phản ánh sâu sắc khát vọng công bằng xã hội của người bình dân, vừa giàu chất trữ tình nhân ái vừa rực lửa trào phúng châm biếm.'
    ],
    keyQuote: '“Chèo là hạt ngọc văn hóa dân gian kết tinh từ bùn đất đồng chiêm và tâm hồn trong sáng của người nông dân Việt.”',
    highlightTag: 'Khởi nguồn sân đình',
    trivia: 'Bà tổ của nghệ thuật Chèo Việt Nam là bà Phạm Thị Trân, nữ quan coi việc múa hát dưới triều vua Đinh Tiên Hoàng.'
  },
  {
    id: 'kb_archetypes',
    category: 'characters',
    title: 'Hệ Thống Nhân Vật & Mô Hình Vai Diễn',
    subtitle: 'Năm trụ cột: Đào, Kép, Lão, Mụ, Hề',
    summary: 'Nhân vật chèo được phân chia thành các mô hình điển hình hóa cao độ nhưng mang tính cách vô cùng sống động.',
    content: [
      'Đào: Gồm Đào thương (hiền hậu, đau khổ, nhẫn nhục như Thị Kính), Đào lẳng (phóng túng, dám yêu như Thị Mầu), Đào pha (thông minh, sắc sảo như Đào Huế), Đào chiến (mạnh mẽ, kiên cường).',
      'Kép: Gồm Kép văn (thư sinh nho nhã như Lưu Bình, Thiện Sĩ) và Kép võ (dũng mãnh, trượng nghĩa).',
      'Hề: Linh hồn tiếng cười chèo, gồm Hề áo ngắn (nông dân, người hầu) và Hề áo dài (thầy bói, thầy đồ, lý trưởng dốt nát).',
      'Lão & Mụ: Thể hiện các bậc làm cha mẹ hoặc thế lực cường hào áp bức con cháu.'
    ],
    keyQuote: '“Phi hề bất thành chèo — Không có hề thì không thể thành một vở chèo trọn vẹn.”',
    highlightTag: 'Ngũ trụ vai diễn',
    trivia: 'Mặt hề chèo thường chỉ vẽ một vài nét mực vôi trắng trên sống mũi để phân biệt với người thường.'
  },
  {
    id: 'kb_lan_dieu',
    category: 'melodies',
    title: 'Bách Khoa Làn Điệu Chèo Truyền Thống',
    subtitle: 'Hơn 200 làn điệu phong phú trải qua nghìn năm sàng lọc',
    summary: 'Làn điệu chèo được tổ chức thành các hệ thống (Hệ điệu Sử, Hệ điệu Sa, Hệ điệu Vãn, Hệ điệu Hề, Hát Cách) phục vụ từng trạng thái cảm xúc kịch.',
    content: [
      'Hệ điệu Vãn / Sa Lệch: Chuyên dùng cho các cảnh giãi bày tâm tư u buồn, chia ly, than thân trách phận của Đào thương.',
      'Hệ điệu Lới Lơ / Đào Liễu: Thể hiện tình yêu đôi lứa rạo rực, sự tươi vui và vẻ đẹp đằm thắm của thiếu nữ.',
      'Hệ Hề / Sắp: Tiết tấu nhanh, gãy gọn, giàu nhạc tính nhấn nhá tạo tiếng cười trào lộng.',
      'Hát Cách / Hát Nói: Cung cấp tiết tấu vừa nói vừa hát mang tính tự sự và tranh biện kịch liệt.'
    ],
    keyQuote: '“Làn điệu chèo uốn lượn như dải lụa đào vắt ngang dòng sông quê mẹ.”',
    highlightTag: '200+ Làn điệu',
    trivia: 'Người diễn chèo giỏi phải biết "hát chân phương" rồi mới phát triển lên "hát hoa mỹ" bằng kỹ thuật nẩy hạt, rung ngân độc đáo.'
  },
  {
    id: 'kb_quat_cheo',
    category: 'costume',
    title: 'Bí Mật Chiếc Quạt & Nghệ Thuật Ước Lệ',
    subtitle: 'Một vật phẩm mang vạn biến thái sân khấu',
    summary: 'Chiếc quạt lụa tre là người bạn đồng hành không thể thiếu của mọi đào kép khi bước lên chiếu.',
    content: [
      'Mở quạt phe phẩy nhẹ nhàng: Thể hiện sự thanh tao, nhàn hạ hoặc tiết trời oi ả.',
      'Che ngang nửa mặt cười liếc: Biểu lộ tâm tình e ấp, lúng liếng của nàng đào.',
      'Cầm quạt gõ vào lòng bàn tay: Điệu bộ suy tư, toan tính của nho sĩ hoặc chức dịch làng.',
      'Vung quạt chỉ thẳng phía trước: Biến thành thanh gươm phán xử hoặc ngòi bút viết sớ giải oan.'
    ],
    keyQuote: '“Chiếc quạt thu gọn cả giang sơn, mở ra là thấy cõi lòng nhân thế.”',
    highlightTag: 'Đạo cụ vạn năng',
    trivia: 'Kỹ thuật múa quạt chèo yêu cầu cổ tay phải dẻo mềm như cành liễu trước gió, không được cứng nhắc như kiếm thuật.'
  },
  {
    id: 'kb_tieng_de',
    category: 'art',
    title: 'Văn Hóa Tiếng "Đế" & Tương Tác Sân Đình',
    subtitle: 'Nghệ thuật không rào cản giữa diễn viên và khán giả',
    summary: 'Tiếng "Đế" là sự tham gia đồng sáng tạo của khán giả làng quê vào tiến trình của vở diễn.',
    content: [
      'Khi nhân vật bước ra xưng danh: "Tôi là Thị Mầu...", người đánh trống đế hoặc bà con dưới chiếu liền hỏi: "Ai đấy cô Mầu?", tạo nên cuộc đối thoại dân chủ.',
      'Tiếng đế vừa để dẫn chuyện, vừa để nhắc tuồng, vừa là tiếng nói phê phán đạo đức ngay tại chỗ.',
      'Nhờ tiếng đế, người xem không thụ động mà cảm thấy mình chính là một nhân chứng trong câu chuyện làng.'
    ],
    keyQuote: '“Chiếu chèo không có bức tường thứ tư ngăn cách người diễn và người xem.”',
    highlightTag: 'Đồng sáng tạo',
    trivia: 'Nhiều câu thoại bất hủ của chèo bắt nguồn từ những lời đế ứng khẩu hóm hỉnh của dân làng xưa kia.'
  },
  {
    id: 'kb_vo_mau_muc',
    category: 'plays',
    title: 'Quan Âm Thị Kính & Những Tác Phẩm Bất Hủ',
    subtitle: 'Đỉnh cao tư tưởng nhân văn của sân khấu Việt',
    summary: 'Bảy vở chèo cổ mẫu mực: Quan Âm Thị Kính, Kim Nham, Lưu Bình Dương Lễ, Trương Viên, Từ Thức gặp tiên, Chu Mãi Thần, Trinh Nguyên.',
    content: [
      'Quan Âm Thị Kính: Khắc họa bi kịch của người phụ nữ trong xã hội phong kiến, ca ngợi tấm lòng từ bi hóa Phật cứu độ chúng sinh.',
      'Kim Nham: Bức tranh tâm lý giằng xé dữ dội của nàng Súy Vân khao khát hạnh phúc đích thực nhưng lỡ dở duyên phận.',
      'Lưu Bình Dương Lễ: Bài ca xúc động về tình bạn tri kỷ, đức hy sinh của nàng Châu Long nuôi bạn của chồng ăn học thành tài.'
    ],
    keyQuote: '“Dù trải qua ngàn năm dâu bể, tiếng hát chèo vẫn lay động lòng người bởi tình người sâu nặng.”',
    highlightTag: 'Bảy vở cổ mẫu mực',
    trivia: 'Trích đoạn "Thị Mầu lên chùa" đã được trình diễn tại hàng chục liên hoan sân khấu quốc tế và gây ấn tượng mạnh với bạn bè thế giới.'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_mo_man',
    title: '🏮 Người Mở Màn',
    description: 'Tạo hoặc tham gia ván chơi đầu tiên trên Chiếu Chèo Đêm Trăng.',
    icon: '🏮',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'ach_bac_thay_vai',
    title: '🎭 Bậc Thầy Vai Diễn',
    description: 'Nhập vai và hoàn thành xuất sắc mục tiêu bí mật của nhân vật.',
    icon: '🎭',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'ach_ke_chuyen_trang',
    title: '🌙 Kể Chuyện Đêm Trăng',
    description: 'Thu thập đủ 3 manh mối và giải mã bí mật của màn kịch.',
    icon: '🌙',
    unlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'ach_hieu_lan_dieu',
    title: '🎶 Người Hiểu Làn Điệu',
    description: 'Hoàn thành thử thách nghe và nhận diện làn điệu chèo.',
    icon: '🎶',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'ach_tay_trong_de',
    title: '🪘 Tay Gõ Trống Đế',
    description: 'Thực hiện 5 lần "Đế Vang Sân Đình" hưởng ứng cho bạn diễn.',
    icon: '🪘',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'ach_trang_nguyen_cheo',
    title: '📜 Trạng Nguyên Làng Chèo',
    description: 'Trả lời đúng 3 câu đố kiến thức văn hóa chèo cổ.',
    icon: '📜',
    unlocked: false,
    progress: 0,
    maxProgress: 3
  }
];
