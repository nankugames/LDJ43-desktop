//Version española
var _t = {
	
	distance: 'Distancia',
	toofar: 'Demasiado lejos',
	minutes: 'Minutos',

	hotspots: {
		20: {
			title: 'Casa familiar',
			text: 'La casa de la víctima. Está ubicada en un barrio humilde y tranquilo en el que nadie puede creerse qué ha ocurrido. Todos conocen y estiman al chico.',
			quiz: 'El muchacho vivía en un barrio modesto. Su familia recibió a mi compañero desolada, empezaban a extrañarse de que el chico no hubiese vuelto a casa. Desesperado, el padre del chico me suplicó que encontrara a su hijo. Su dolor me recordó al mío propio en el pasado...',
			quiz0: 'Darle ánimos',
			quiz1: 'Centrarse en el interrogatorio',
			quizOK: 'Me contó que esa mañana había llevado a Thomas al colegio como hacía todas las mañanas. No vio a nadie sospechoso por el camino. Preguntar en el centro era el siguiente paso lógico.'
		},
		9: {
			title: 'Colegio privado',
			text: 'Un colegio de élite solo a la altura de los más selectos. Los que salen de aquí están listos para gobernar la ciudad.',
		},
		16: {
			title: 'Colegio público',
			text: 'Un colegio al alcance de todos. Tiene una enorme saturación de alumnos y un historial de rivalidad con el otro colegio de la ciudad.',
			quiz: 'En el colegio el profesor de Thomas me confirmó que el chico no llegó a entrar en su clase. Afirmó no saber nada del muchacho, pero Thomas siempre andaba con un compañero de clase que tampoco había asistido...',
			quiz0: 'Recriminarle no avisar a los padres',
			quiz1: 'Agradecer su cooperación',
			quizOK: 'Al final nos dio el teléfono del chico, seguramente sabría algo. Me decidí a llamarle inmediatamente desde el teléfono.',
			quiz0val: 5,
			quiz1val: 10
		},
		10: {
			title: 'Centro comercial de moda',
			text: 'El centro más chic de la ciudad, lugar habitual de puestos callejeros, compras impulsivas y cotilleos jugosos.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		7: {
			title: 'Centro comercial moderno',
			text: 'Lugar de reunión de los jóvenes más modernos. Los recreativos tienen lo último de lo último y el lugar tiene un toque futurista y unos cines carísimos siempre llenos.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		21: {
			title: 'Centro comercial decadente',
			text: 'El edificio se cae a pedazos y parece a punto de cerrar. Sus billares y sus recreativas clásicas mantienen el encanto retro.',
			quiz: 'Mi compañero me puso en contacto con la guardia del parking. Me contó que era posible que las cámaras del parking hubiesen registrado algo...',
			quiz0: 'Esperar a que lo haga ella',
			quiz1: 'Llamar a su jefe',
			quizOK: 'La cámara del aparcamiento había grabado cómo alguien con pasamontañas drogó al niño con cloroformo y le metió en un vehículo. La grabación mostraba el modelo del vehículo, pero no al conductor ni la matrícula... Se trataba de una furgoneta gris muy antigua. Un modelo que solo aceptaba gasolina. Decidí llamar al equipo técnico y pedir apoyo.',
			quiz0val: 5,
			quiz1val: 10
		},
		22: {
			title: 'Polideportivo cubierto',
			text: 'Con su pista de atletismo y tres piscinas climatizadas, es el mayor centro de deporte de la ciudad. Y cuando llueve no te mojas.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		24: {
			title: 'Parque al aire libre',
			text: 'Entre tanto coche muchos disfrutan haciendo actividades al aire libre. Se suelen jugar desde partidos de fútbol hasta a la petanca.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		23: {
			title: 'Puente Ruth Towers',
			text: 'Un famoso puente peatonal y levadizo del siglo pasado. Aún funciona como puente y como atracción turística.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		25: {
			title: 'Calle Irving',
			text: 'Este puente mantiene la circulación en un solo sentido hacia el sur. Algunos lo encuentras irritante, pero ayuda a gestionar el tráfico local.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		27: {
			title: 'Puente del Este',
			text: 'El puente más alejado del centro, es también es de más reciente construcción. Actúa como refuerzo eficaz al tráfico norte-sur.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		19: {
			title: 'Almacén de bricolaje',
			text: 'Un almacén donde comprar desde un destornillador hasta lo necesario para fabricar una casa con tus manos.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		15: {
			title: 'Gasolinera automatizada',
			text: 'La gasolinera más avanzada de la ciudad, vigilada por un sofisticado y poco disimulado sistema de cámaras.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		5: {
			title: 'Gasolinera nueva',
			text: 'Acaba de construirse y es tan reciente que, de momento, solo sirve diesel. El precio del futuro.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		13: {
			title: 'Puesto de gasolina',
			text: 'Son, literalmente, puestos para echar gasolina en la calle. Un reflejo de otra época más sencilla. Solo sirve gasolina, como manda la tradición.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		17: {
			title: 'Descampado',
			text: 'Un descampado vacío. Ni los niños lo usan para jugar, frecuentado por yonkis.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		12: {
			title: 'Semáforo',
			text: 'Ubicado en uno de los cruces más activos de la ciudad. Molesta más que ayuda, no estaba pensado que tanto tráfico pasara por aquí.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		11: {
			title: 'Aparcamiento subterráneo',
			text: 'Un parking enorme que da cabida a un parque y una zona administrativa. Usa rampas y ascensores para dar acceso.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		3: {
			title: 'Zona antigua de la ciudad',
			text: 'La zona histórica está llena de callejuelas, plazas y esquinas serpenteantes. Como estar en una montaña rusa.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		8: {
			title: 'Rotonda gigante',
			text: 'Esta rotonda tiene varios pisos e interconecta varias autopistas en un rosco de muchas ramificaciones. Siempre cuesta entrar y no es raro tener que dar varias vueltas para poder salir.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		1: {
			title: 'Puerto',
			text: 'El puerto de la ciudad siempre está bullendo de actividad, ruido y controles. Un lugar húmedo y sucio con un vigorizante olor a salado.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		2: {
			title: 'Barrio especulativo',
			text: 'Antiguo barrio de casas que nunca llegaron a venderse. Ahora está semi habitado por indigentes. Se espera que algún día el ayuntamiento lo eche abajo.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		6: {
			title: 'Cantera',
			text: 'Una montaña excavada por el hombre y abandonada al agotar sus recursos. Las máquinas abandonadas acumulan polvo, como si fuesen esqueletos de otra época. Demasiado lejos y demasiado inútil para todos.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		26: {
			title: 'Barrio de edificios',
			text: 'Un abigarrado barrio pobre de edificios altos. Pasan mil cosas en sus calles caóticas y hay tanta gente que nadie termina de conocerse.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		28: {
			title: 'Barrio residencial rico',
			text: 'La opulencia de sus casas contrasta con los grandes edificios oscuros a su alrededor. Lleno de gente cuyas preocupaciones son de otro planeta.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		18: {
			title: 'Kiosko',
			text: 'Un puestecito cerca del centro de la ciudad. Nadie sabe cuánto lleva ahí y ha sido posesión de la misma familia durante generaciones. Tu sitio de confianza.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		14: {
			title: 'Ferretería',
			text: 'Un pequeño negocio que da lo suficiente para sobrevivir. El clásico sitio en el que nadie se fija, ni siquiera cuando buscas una ferretería.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},
		4: {
			title: 'Barrio dormitorio',
			text: 'Un barrio en el que la gente pasa poco tiempo en casa. Los niños son especialmente susceptibles a esto y necesitan usar más la imaginación que los niños del centro.',
			quiz: '',
			quiz0: '',
			quiz1: '',
			quizOK: '',
			quiz0val: 5,
			quiz1val: 10
		},

	}

}
/* PENDIENTE DE ACTUALIZAR CON EL GUION Y COMPLETAR LOS 17 CONTACTOS (DEFINIDO EN MOVIL.JS)
var contacts=[{
    idImage:"contact1",
    infoArray:["Pista1:Me parecio ver un lindo gatito","Pista2:Era una rata","Pista3:Me la comi igualmente"],
    indexInfo:0,
    siteMaplocation:"Su casa",
    suspect:false,
    guilty:true
},
{
    idImage:"contact2",
    infoArray:["Pista1:Se huele la tostada","Pista2:No habia luz","Pista3:Me dolia la almendra del ruido de la calle"],
    indexInfo:0,
    siteMaplocation:"Mi casa",
    suspect:true,
    guilty:false
},
{
idImage:"contact3",
infoArray:["Pista1:Se huele la tostada","Pista2:No habia luz","Pista3:Me dolia la almendra del ruido de la calle"],
indexInfo:0,
siteMaplocation:"casa3",
suspect:true,
guilty:false
},
{
idImage:"contact4",
infoArray:["Pista1:Sandias","Pista2:Pezespada","Pista3:Obtuso"],
indexInfo:0,
siteMaplocation:"casa4",
suspect:true,
guilty:false
},
{
idImage:"contact5",
infoArray:["Pista1:fdafbb","Pista2:tejhgdfds","cvgghhh"],
indexInfo:0,
siteMaplocation:"casa5",
suspect:true,
guilty:false
},
{
idImage:"contact6",
infoArray:["Pista1:advv","Pista2:ntgdvjka55","Pista3:456"],
indexInfo:0,
siteMaplocation:"casa6",
suspect:true,
guilty:false
},
{
idImage:"contact7",
infoArray:["Pista1:Sebbbrr","Pista2:xcfgds","Pista3:dbbnhgdddsa"],
indexInfo:0,
siteMaplocation:"casa7",
suspect:true,
guilty:false
},
{
idImage:"contact8",
infoArray:["Pista1:padfjapd","Pista2:dfads","Pista3:dfadsfa"],
indexInfo:0,
siteMaplocation:"casa8",
suspect:true,
guilty:false
}]; */