(() => {
  "use strict";
  const make = (region, tr, la, count, landmarks) => ({
    region, tr, la, count,
    landmarks: landmarks.split(";").map((part) => {
      const [latin, turkish] = part.split("=");
      return { latin, turkish };
    })
  });
  const bones = [
    // Kafatası: 8 beyin kutusu kemiği
    make("skull","Alın kemiği","Os frontale",1,"Squama frontalis=Alın bölümü;Pars orbitalis=Göz çukuru bölümü;Pars nasalis=Burun bölümü;Glabella=Kaşlar arasındaki düz alan;Margo supraorbitalis=Göz çukuru üst kenarı;Foramen supraorbitale=Göz çukuru üst deliği;Sinus frontalis=Alın sinüsü"),
    make("skull","Duvar kemiği","Os parietale",2,"Eminentia parietalis=Duvar kabartısı;Linea temporalis superior et inferior=Üst ve alt şakak çizgileri;Sulcus sinus sagittalis superioris=Üst sagittal sinüs oluğu"),
    make("skull","Şakak kemiği","Os temporale",2,"Pars squamosa=Yassı bölüm;Pars petrosa=Kayalık bölüm;Pars tympanica=Timpanik bölüm;Processus mastoideus=Mastoid çıkıntı;Processus styloideus=Stiloid çıkıntı;Processus zygomaticus=Zigomatik çıkıntı;Fossa mandibularis=Çene eklem çukuru;Meatus acusticus externus=Dış kulak yolu;Canalis caroticus=Karotis kanalı;Meatus acusticus internus=İç kulak yolu"),
    make("skull","Art kafa kemiği","Os occipitale",1,"Squama occipitalis=Art kafa yassı bölümü;Pars basilaris=Taban bölümü;Foramen magnum=Büyük delik;Condylus occipitalis=Art kafa kondili;Protuberantia occipitalis externa=Dış art kafa çıkıntısı;Linea nuchalis superior=Üst ense çizgisi"),
    make("skull","Kama kemiği","Os sphenoidale",1,"Corpus=Gövde;Sella turcica=Türk eğeri;Ala major=Büyük kanat;Ala minor=Küçük kanat;Processus pterygoideus=Kanat çıkıntısı;Canalis opticus=Optik kanal;Foramen rotundum=Yuvarlak delik;Foramen ovale=Oval delik;Foramen spinosum=Dikenli delik"),
    make("skull","Kalbur kemiği","Os ethmoidale",1,"Lamina cribrosa=Kalbur levhası;Crista galli=Horoz ibiği;Lamina perpendicularis=Dikey levha;Labyrinthus ethmoidalis=Kalbur labirenti;Concha nasalis superior=Üst burun konkası;Concha nasalis media=Orta burun konkası"),
    // Yüz: 14 kemik
    make("skull","Alt çene kemiği","Mandibula",1,"Corpus mandibulae=Gövde;Ramus mandibulae=Dal;Angulus mandibulae=Açı;Processus condylaris=Kondiler çıkıntı;Processus coronoideus=Koronoid çıkıntı;Incisura mandibulae=Çene çentiği;Foramen mentale=Çene deliği;Foramen mandibulae=Alt çene deliği;Canalis mandibulae=Alt çene kanalı;Pars alveolaris=Alveol bölümü"),
    make("skull","Üst çene kemiği","Maxilla",2,"Corpus maxillae=Gövde;Processus frontalis=Alın çıkıntısı;Processus zygomaticus=Zigomatik çıkıntı;Processus alveolaris=Alveol çıkıntısı;Processus palatinus=Damaksı çıkıntı;Foramen infraorbitale=Göz çukuru altı deliği;Sinus maxillaris=Üst çene sinüsü;Canalis incisivus=Kesici diş kanalı"),
    make("skull","Elmacık kemiği","Os zygomaticum",2,"Processus frontalis=Alın çıkıntısı;Processus temporalis=Şakak çıkıntısı;Processus maxillaris=Üst çene çıkıntısı;Foramen zygomaticofaciale=Yüz tarafı zigomatik deliği;Facies orbitalis=Göz çukuru yüzü"),
    make("skull","Burun kemiği","Os nasale",2,"Facies externa=Dış yüz;Facies interna=İç yüz;Margo nasalis=Burun kenarı"),
    make("skull","Gözyaşı kemiği","Os lacrimale",2,"Sulcus lacrimalis=Gözyaşı oluğu;Fossa sacci lacrimalis=Gözyaşı kesesi çukuru;Hamulus lacrimalis=Gözyaşı kancası"),
    make("skull","Damak kemiği","Os palatinum",2,"Lamina horizontalis=Yatay levha;Lamina perpendicularis=Dikey levha;Processus pyramidalis=Piramit çıkıntı;Foramen palatinum majus=Büyük damak deliği"),
    make("skull","Alt burun konkası","Concha nasalis inferior",2,"Facies medialis=İç yüz;Processus lacrimalis=Gözyaşı çıkıntısı;Processus maxillaris=Üst çene çıkıntısı;Processus ethmoidalis=Kalbur kemiği çıkıntısı"),
    make("skull","Sapan kemiği","Vomer",1,"Ala vomeris=Sapan kemiği kanadı;Sulcus vomeris=Sapan kemiği oluğu;Margo superior=Üst kenar;Margo inferior=Alt kenar"),
    // Orta kulak kemikçikleri: 6 kemik
    make("ear","Çekiç kemiği","Malleus",2,"Caput mallei=Çekiç başı;Collum mallei=Çekiç boynu;Manubrium mallei=Çekiç sapı;Processus anterior=Ön çıkıntı;Processus lateralis=Yan çıkıntı"),
    make("ear","Örs kemiği","Incus",2,"Corpus incudis=Örs gövdesi;Crus breve=Kısa kol;Crus longum=Uzun kol;Processus lenticularis=Mercimeksi çıkıntı"),
    make("ear","Üzengi kemiği","Stapes",2,"Caput stapedis=Üzengi başı;Crus anterius=Ön kol;Crus posterius=Arka kol;Basis stapedis=Üzengi tabanı"),
    make("axial","Dil kemiği","Os hyoideum",1,"Corpus ossis hyoidei=Gövde;Cornu majus=Büyük boynuz;Cornu minus=Küçük boynuz"),
    // Omurga: 24 ayrı omur + kaynaşmış sakrum ve koksiks
    make("spine","Birinci boyun omuru (atlas)","Atlas",1,"Arcus anterior=Ön yay;Arcus posterior=Arka yay;Massa lateralis=Yan kitle;Fovea articularis superior=Üst eklem çukuru;Fovea dentis=Dens eklem çukuru;Foramen transversarium=Enine çıkıntı deliği;Foramen vertebrale=Omur deliği"),
    make("spine","İkinci boyun omuru (axis)","Axis",1,"Dens axis=Axis dişi;Corpus vertebrae=Omur gövdesi;Processus spinosus=Diken çıkıntı;Facies articulares superiores=Üst eklem yüzleri;Foramen transversarium=Enine çıkıntı deliği"),
    make("spine","C3–C6 tipik boyun omurları","Vertebrae cervicales III–VI",4,"Corpus vertebrae=Omur gövdesi;Foramen vertebrale=Omur deliği;Processus transversus=Enine çıkıntı;Foramen transversarium=Enine çıkıntı deliği;Processus spinosus=Diken çıkıntı;Processus articulares=Eklem çıkıntıları"),
    make("spine","Yedinci boyun omuru (vertebra prominens)","Vertebra prominens",1,"Processus spinosus=Diken çıkıntı;Foramen transversarium=Enine çıkıntı deliği;Corpus vertebrae=Omur gövdesi;Foramen vertebrale=Omur deliği"),
    make("spine","T1–T12 göğüs omurları","Vertebrae thoracicae I–XII",12,"Corpus vertebrae=Omur gövdesi;Fovea costalis superior=Üst kaburga çukuru;Fovea costalis inferior=Alt kaburga çukuru;Fovea costalis processus transversi=Enine çıkıntı kaburga çukuru;Processus spinosus=Diken çıkıntı;Foramen vertebrale=Omur deliği"),
    make("spine","L1–L5 bel omurları","Vertebrae lumbales I–V",5,"Corpus vertebrae=Omur gövdesi;Processus spinosus=Diken çıkıntı;Processus transversus=Enine çıkıntı;Processus articularis superior=Üst eklem çıkıntısı;Processus articularis inferior=Alt eklem çıkıntısı;Processus mammillaris=Meme çıkıntısı;Foramen vertebrale=Omur deliği"),
    make("spine","Sağrı kemiği","Os sacrum",1,"Basis ossis sacri=Taban;Apex ossis sacri=Apeks;Promontorium=Çıkıntı;Canalis sacralis=Sağrı kanalı;Foramina sacralia anteriora=Ön sağrı delikleri;Foramina sacralia posteriora=Arka sağrı delikleri;Facies auricularis=Kulak yüzü;Hiatus sacralis=Sağrı açıklığı"),
    make("spine","Kuyruk sokumu kemiği","Os coccygis",1,"Basis ossis coccygis=Taban;Apex ossis coccygis=Apeks;Cornua coccygea=Kuyruk sokumu boynuzları;Processus transversi=Enine çıkıntılar"),
    // Göğüs kafesi
    make("thorax","1. kaburga","Costa prima",2,"Caput costae=Kaburga başı;Collum costae=Kaburga boynu;Tuberculum costae=Kaburga tüberkülü;Sulcus arteriae subclaviae=Köprücük altı atardamar oluğu;Sulcus venae subclaviae=Köprücük altı toplardamar oluğu;Tuberculum musculi scaleni anterioris=Ön skalen kas tüberkülü"),
    make("thorax","2. kaburga","Costa secunda",2,"Caput costae=Kaburga başı;Collum costae=Kaburga boynu;Tuberculum costae=Kaburga tüberkülü;Angulus costae=Kaburga açısı;Corpus costae=Kaburga gövdesi;Sulcus costae=Kaburga oluğu"),
    make("thorax","3.–7. kaburgalar","Costae III–VII",10,"Caput costae=Kaburga başı;Collum costae=Kaburga boynu;Tuberculum costae=Kaburga tüberkülü;Angulus costae=Kaburga açısı;Corpus costae=Kaburga gövdesi;Sulcus costae=Kaburga oluğu"),
    make("thorax","8.–10. kaburgalar","Costae VIII–X",6,"Caput costae=Kaburga başı;Collum costae=Kaburga boynu;Tuberculum costae=Kaburga tüberkülü;Angulus costae=Kaburga açısı;Corpus costae=Kaburga gövdesi;Sulcus costae=Kaburga oluğu"),
    make("thorax","11.–12. yüzen kaburgalar","Costae fluctuantes XI–XII",4,"Caput costae=Kaburga başı;Collum costae=Kaburga boynu;Corpus costae=Kaburga gövdesi;Sulcus costae=Kaburga oluğu"),
    make("thorax","Göğüs kemiği","Sternum",1,"Manubrium sterni=Göğüs kemiği kabzası;Corpus sterni=Gövde;Processus xiphoideus=Kılıç çıkıntısı;Incisura jugularis=Boyun çentiği;Angulus sterni=Göğüs kemiği açısı;Incisurae costales=Kaburga çentikleri"),
    // Omuz kuşağı ve üst ekstremite
    make("upper","Köprücük kemiği","Clavicula",2,"Extremitas sternalis=Göğüs kemiği ucu;Extremitas acromialis=Akromiyon ucu;Corpus claviculae=Gövde;Tuberculum conoideum=Konik tüberkül;Sulcus musculi subclavii=Köprücük altı kas oluğu;Impressio ligamenti costoclavicularis=Kaburga-köprücük bağı izi"),
    make("upper","Kürek kemiği","Scapula",2,"Spina scapulae=Kürek kemiği dikeni;Acromion=Akromiyon;Processus coracoideus=Gaga çıkıntısı;Cavitas glenoidalis=Eklem çukuru;Fossa supraspinata=Üst diken çukuru;Fossa infraspinata=Alt diken çukuru;Fossa subscapularis=Kürek altı çukuru;Incisura scapulae=Kürek kemiği çentiği;Margo medialis=İç kenar;Margo lateralis=Dış kenar;Angulus inferior=Alt açı"),
    make("upper","Üst kol kemiği","Humerus",2,"Caput humeri=Baş;Collum anatomicum=Anatomik boyun;Collum chirurgicum=Cerrahi boyun;Tuberculum majus=Büyük tüberkül;Tuberculum minus=Küçük tüberkül;Sulcus intertubercularis=Tüberküller arası oluk;Tuberositas deltoidea=Deltoid tüberozitesi;Capitulum humeri=Başçık;Trochlea humeri=Makarası;Epicondylus medialis=İç epikondil;Epicondylus lateralis=Dış epikondil;Fossa olecrani=Olekranon çukuru;Fossa coronoidea=Koronoid çukur"),
    make("upper","Radius","Radius",2,"Caput radii=Baş;Fovea articularis capitis radii=Baş eklem çukuru;Collum radii=Boyun;Tuberositas radii=Radius tüberozitesi;Incisura ulnaris=Ulna çentiği;Processus styloideus=Stiloid çıkıntı;Tuberculum dorsale=Dorsal tüberkül;Facies articularis carpalis=El bileği eklem yüzü"),
    make("upper","Ulna","Ulna",2,"Olecranon=Dirsek çıkıntısı;Processus coronoideus=Koronoid çıkıntı;Incisura trochlearis=Makaramsı çentik;Incisura radialis=Radius çentiği;Tuberositas ulnae=Ulna tüberozitesi;Caput ulnae=Ulna başı;Processus styloideus=Stiloid çıkıntı"),
    make("upper","Kayık kemiği","Os scaphoideum",2,"Tuberculum ossis scaphoidei=Kayık kemiği tüberkülü;Facies articulares=Eklem yüzleri"),
    make("upper","Ay kemiği","Os lunatum",2,"Facies articulares=Eklem yüzleri"),
    make("upper","Üçgen kemik","Os triquetrum",2,"Facies articularis ossis pisiformis=Bezelye kemiği eklem yüzü;Facies articulares=Eklem yüzleri"),
    make("upper","Bezelye kemiği","Os pisiforme",2,"Facies articularis=Eklem yüzü;Tuberositas ossis pisiformis=Bezelye kemiği tüberkülü"),
    make("upper","Çokgen büyük kemik","Os trapezium",2,"Facies articularis carpalis=El bileği eklem yüzü;Sulcus tendinis musculi flexoris carpi radialis=Radius tarafı el bileği bükücü kas oluğu;Tuberculum ossis trapezii=Çokgen büyük kemik tüberkülü"),
    make("upper","Çokgen küçük kemik","Os trapezoideum",2,"Facies articulares=Eklem yüzleri"),
    make("upper","Baş kemik","Os capitatum",2,"Caput ossis capitati=Baş;Corpus ossis capitati=Gövde;Facies articulares=Eklem yüzleri"),
    make("upper","Çengel kemik","Os hamatum",2,"Hamulus ossis hamati=Çengel çıkıntı;Corpus ossis hamati=Gövde;Facies articulares=Eklem yüzleri"),
    make("upper","I. el tarak kemiği","Os metacarpale I",2,"Basis ossis metacarpalis=Taban;Corpus ossis metacarpalis=Gövde;Caput ossis metacarpalis=Baş;Facies articularis carpalis=El bileği eklem yüzü"),
    make("upper","II. el tarak kemiği","Os metacarpale II",2,"Basis ossis metacarpalis=Taban;Corpus ossis metacarpalis=Gövde;Caput ossis metacarpalis=Baş"),
    make("upper","III. el tarak kemiği","Os metacarpale III",2,"Basis ossis metacarpalis=Taban;Corpus ossis metacarpalis=Gövde;Caput ossis metacarpalis=Baş;Processus styloideus=Stiloid çıkıntı"),
    make("upper","IV. el tarak kemiği","Os metacarpale IV",2,"Basis ossis metacarpalis=Taban;Corpus ossis metacarpalis=Gövde;Caput ossis metacarpalis=Baş"),
    make("upper","V. el tarak kemiği","Os metacarpale V",2,"Basis ossis metacarpalis=Taban;Corpus ossis metacarpalis=Gövde;Caput ossis metacarpalis=Baş;Tuberositas ossis metacarpalis V=Beşinci el tarak kemiği tüberozitesi"),
    make("upper","Başparmak proksimal falanksı","Phalanx proximalis pollicis",2,"Basis phalangis=Taban;Corpus phalangis=Gövde;Caput phalangis=Baş"),
    make("upper","II.–V. parmak proksimal falanksları","Phalanges proximales digitorum II–V",8,"Basis phalangis=Taban;Corpus phalangis=Gövde;Caput phalangis=Baş"),
    make("upper","II.–V. parmak orta falanksları","Phalanges mediae digitorum II–V",8,"Basis phalangis=Taban;Corpus phalangis=Gövde;Caput phalangis=Baş"),
    make("upper","Başparmak distal falanksı","Phalanx distalis pollicis",2,"Basis phalangis=Taban;Corpus phalangis=Gövde;Tuberositas phalangis distalis=Uç falanks tüberozitesi"),
    make("upper","II.–V. parmak distal falanksları","Phalanges distales digitorum II–V",8,"Basis phalangis=Taban;Corpus phalangis=Gövde;Tuberositas phalangis distalis=Uç falanks tüberozitesi"),
    // Pelvis: her os coxae erişkinde tek kemik olarak sayılır
    make("pelvis","Kalça kemiği","Os coxae",2,"Os ilium=İlium;Os ischii=İschium;Os pubis=Pubis;Acetabulum=Asetabulum;Foramen obturatum=Obturator deliği;Crista iliaca=İliak krest;Spina iliaca anterior superior=Ön üst iliak diken;Spina iliaca anterior inferior=Ön alt iliak diken;Spina iliaca posterior superior=Arka üst iliak diken;Spina iliaca posterior inferior=Arka alt iliak diken;Fossa iliaca=İliak çukur;Spina ischiadica=İskiyal diken;Tuber ischiadicum=İskiyal tüber;Ramus superior ossis pubis=Pubisin üst kolu;Ramus inferior ossis pubis=Pubisin alt kolu;Facies symphysialis=Pubik simfiz yüzü"),
    // Alt ekstremite
    make("lower","Uyluk kemiği","Femur",2,"Caput femoris=Baş;Fovea capitis femoris=Baş çukuru;Collum femoris=Boyun;Trochanter major=Büyük trokanter;Trochanter minor=Küçük trokanter;Linea intertrochanterica=Trokanterler arası çizgi;Crista intertrochanterica=Trokanterler arası krest;Linea aspera=Pürtüklü çizgi;Condylus medialis=İç kondil;Condylus lateralis=Dış kondil;Epicondylus medialis=İç epikondil;Epicondylus lateralis=Dış epikondil;Facies patellaris=Patella yüzü;Fossa intercondylaris=Kondiller arası çukur"),
    make("lower","Diz kapağı kemiği","Patella",2,"Basis patellae=Taban;Apex patellae=Apeks;Facies articularis=Eklem yüzü;Facies anterior=Ön yüz"),
    make("lower","Kaval kemiği","Tibia",2,"Condylus medialis=İç kondil;Condylus lateralis=Dış kondil;Eminentia intercondylaris=Kondiller arası çıkıntı;Tuberositas tibiae=Tibia tüberozitesi;Margo anterior=Ön kenar;Linea musculi solei=Yalın kas çizgisi;Malleolus medialis=İç malleol;Incisura fibularis=Fibula çentiği"),
    make("lower","Kamış kemiği","Fibula",2,"Caput fibulae=Baş;Apex capitis fibulae=Baş tepesi;Collum fibulae=Boyun;Corpus fibulae=Gövde;Malleolus lateralis=Dış malleol;Fossa malleoli lateralis=Dış malleol çukuru"),
    make("lower","Aşık kemiği","Talus",2,"Corpus tali=Gövde;Trochlea tali=Makarası;Collum tali=Boyun;Caput tali=Baş;Facies articularis calcanea=Kalkaneus eklem yüzleri"),
    make("lower","Topuk kemiği","Calcaneus",2,"Tuber calcanei=Topuk tüberi;Sustentaculum tali=Aşık kemiği desteği;Facies articularis talaris=Aşık kemiği eklem yüzleri;Sulcus calcanei=Topuk oluğu;Trochlea fibularis=Fibula makarası"),
    make("lower","Kayık kemiği","Os naviculare",2,"Tuberositas ossis navicularis=Kayık kemiği tüberozitesi;Facies articularis talaris=Aşık kemiği eklem yüzü"),
    make("lower","Küp kemiği","Os cuboideum",2,"Sulcus tendinis musculi fibularis longi=Uzun fibular kas tendonu oluğu;Tuberositas ossis cuboidei=Küp kemiği tüberozitesi;Facies articulares=Eklem yüzleri"),
    make("lower","İç çivi kemiği","Os cuneiforme mediale",2,"Facies articulares=Eklem yüzleri;Basis=Taban"),
    make("lower","Orta çivi kemiği","Os cuneiforme intermedium",2,"Facies articulares=Eklem yüzleri;Basis=Taban"),
    make("lower","Dış çivi kemiği","Os cuneiforme laterale",2,"Facies articulares=Eklem yüzleri;Basis=Taban"),
    make("lower","I. ayak tarak kemiği","Os metatarsale I",2,"Basis ossis metatarsalis=Taban;Corpus ossis metatarsalis=Gövde;Caput ossis metatarsalis=Baş;Tuberositas ossis metatarsalis I=Birinci ayak tarak kemiği tüberozitesi"),
    make("lower","II. ayak tarak kemiği","Os metatarsale II",2,"Basis ossis metatarsalis=Taban;Corpus ossis metatarsalis=Gövde;Caput ossis metatarsalis=Baş"),
    make("lower","III. ayak tarak kemiği","Os metatarsale III",2,"Basis ossis metatarsalis=Taban;Corpus ossis metatarsalis=Gövde;Caput ossis metatarsalis=Baş"),
    make("lower","IV. ayak tarak kemiği","Os metatarsale IV",2,"Basis ossis metatarsalis=Taban;Corpus ossis metatarsalis=Gövde;Caput ossis metatarsalis=Baş"),
    make("lower","V. ayak tarak kemiği","Os metatarsale V",2,"Basis ossis metatarsalis=Taban;Corpus ossis metatarsalis=Gövde;Caput ossis metatarsalis=Baş;Tuberositas ossis metatarsalis V=Beşinci ayak tarak kemiği tüberozitesi"),
    make("lower","I. ayak parmağı proksimal falanksı","Phalanx proximalis hallucis",2,"Basis phalangis=Taban;Corpus phalangis=Gövde;Caput phalangis=Baş"),
    make("lower","II.–V. ayak parmakları proksimal falanksları","Phalanges proximales digitorum II–V pedis",8,"Basis phalangis=Taban;Corpus phalangis=Gövde;Caput phalangis=Baş"),
    make("lower","II.–V. ayak parmakları orta falanksları","Phalanges mediae digitorum II–V pedis",8,"Basis phalangis=Taban;Corpus phalangis=Gövde;Caput phalangis=Baş"),
    make("lower","I. ayak parmağı distal falanksı","Phalanx distalis hallucis",2,"Basis phalangis=Taban;Corpus phalangis=Gövde;Tuberositas phalangis distalis=Uç falanks tüberozitesi"),
    make("lower","II.–V. ayak parmakları distal falanksları","Phalanges distales digitorum II–V pedis",8,"Basis phalangis=Taban;Corpus phalangis=Gövde;Tuberositas phalangis distalis=Uç falanks tüberozitesi")
  ];
  const groups = [
    {id:"all", label:"Tüm iskelet"},
    {id:"skull", label:"Kafatası ve yüz"},
    {id:"ear", label:"Kulak kemikçikleri"},
    {id:"axial", label:"Hyoid"},
    {id:"spine", label:"Omurga"},
    {id:"thorax", label:"Göğüs kafesi"},
    {id:"upper", label:"Omuz, kol ve el"},
    {id:"pelvis", label:"Pelvis"},
    {id:"lower", label:"Bacak ve ayak"}
  ];
  window.FTR_SKELETON = {
    adultCount: 206,
    bones,
    groups,
    sources: [
      {label:"OpenStax · Eksen ve appendiküler iskelet", url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-1-divisions-of-the-skeletal-system"},
      {label:"OpenStax · Kemik yapısı ve kemik işaretleri", url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/6-3-bone-structure"},
      {label:"OpenStax · Kafatası", url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-2-the-skull"},
      {label:"OpenStax · Omurga", url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column"},
      {label:"OpenStax · Pelvik kuşak ve pelvis", url:"https://openstax.org/books/anatomy-and-physiology-2e/pages/8-3-the-pelvic-girdle-and-pelvis"},
      {label:"FIPAT / IFAA · Terminologia Anatomica", url:"https://ifaa.unifr.ch/Public/TNAEntryPage/prop/HomeTNAPublicLAEN.html"}
    ]
  };
  function roman(number) {
    const symbols=[[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
    let result="";
    for(const [value,symbol] of symbols) while(number>=value){result+=symbol;number-=value}
    return result;
  }
  function expandBone(bone) {
    const vertebra=bone.tr.match(/^(C|T|L)(\d+)–(C|T|L)?(\d+)/);
    if(vertebra&&bone.region==="spine") {
      const start=Number(vertebra[2]),end=Number(vertebra[4]),prefix=vertebra[1];
      const series={C:["cervicalis","boyun omuru"],T:["thoracica","göğüs omuru"],L:["lumbalis","bel omuru"]}[prefix];
      return Array.from({length:end-start+1},(_,i)=>({...bone,tr:(start+i)+". "+series[1],la:"Vertebra "+series[0]+" "+roman(start+i),side:"Orta hat"}));
    }
    const rib=bone.tr.match(/^(\d+)\.–(\d+)\. (?:yüzen )?kaburgalar$/);
    if(rib&&bone.region==="thorax") {
      const out=[];
      for(let n=Number(rib[1]);n<=Number(rib[2]);n++) for(const side of ["Sağ","Sol"]) out.push({...bone,tr:n+". "+(bone.tr.includes("yüzen")?"yüzen ":"")+"kaburga",la:(bone.tr.includes("yüzen")?"Costa fluctuans ":"Costa ")+roman(n),side});
      return out;
    }
    if(bone.count===8&&/II\.–V\./.test(bone.tr)) {
      const position=bone.tr.includes("proksimal")?"proksimal":bone.tr.includes("orta")?"orta":"distal";
      const latinPosition=bone.la.includes("proximales")?"proximalis":bone.la.includes("mediae")?"media":"distalis";
      const foot=bone.la.includes("pedis")?" pedis":"";
      const out=[];
      for(const digit of ["II","III","IV","V"]) for(const side of ["Sağ","Sol"]) out.push({...bone,tr:side+" "+digit+". parmak "+position+" falanksı",la:"Phalanx "+latinPosition+" digiti "+digit+foot,side});
      return out;
    }
    if(bone.count===2) return [{...bone,tr:"Sağ "+bone.tr,side:"Sağ"},{...bone,tr:"Sol "+bone.tr,side:"Sol"}];
    if(bone.count===1) return [{...bone,side:"Tek kemik"}];
    throw new Error("Tanımsız kemik sayım grubu: "+bone.tr);
  }
  window.FTR_SKELETON.instances=bones.flatMap(expandBone);
  window.FTR_SKELETON.expandedCount=window.FTR_SKELETON.instances.length;
})();