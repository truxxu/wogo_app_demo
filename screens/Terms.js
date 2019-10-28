import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { colors } from '../envStyles';

const Terms = ({navigation}) => {
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            Términos y Condiciones de Uso De Plataforma WOGO
          </Text>
          <Text style={styles.text}>
            El contenido del presente documento proyecta los ‘‘Términos y Condiciones de Uso’’ mediante los cuales se crea el escenario adecuado para la interacción de los USUARIOS (CLIENTES FINALES) con la plataforma web y la aplicación móvil. Teniendo en cuenta que la PLATAFORMA funge como canal digital de tercerización entre los puntos de venta ALIADOS u oferentes, es fundamental aclarar que desde la plataforma los usuarios pueden pedir el servicio, producto o productos de acuerdo al catálogo ofertado por el establecimiento ALIADO u oferentes, pero en ningún caso WOGO S.A.S. podrá ser responsable por la calidad, cantidad u otras calidades de los productos ofrecidos por el ALIADO u oferentes salvo por causas imputables a WOGO S.A.S.
          </Text>
          <Text style={styles.text}>
            La plataforma prestara el servicio de tercerización por medio de la publicación y condensación de toda la información necesaria para realizar tal labor (productos, servicios, horarios de establecimientos, precios, promociones especiales) así como el acompañamiento de personal dedicado y entrenado durante el desarrollo de la relación de consumo, buscando siempre la satisfacción del CLIENTE FINAL final, como el objetivo fundamental de la relación.
          </Text>
          <Text style={styles.text}>
            Es necesario que el usuario que ingrese a la plataforma lea y acepte los términos y condiciones más adelante mencionados, ya que el desconocimiento de su contenido no será causal de exoneración por su incumplimiento.
          </Text>
          <Text style={styles.subtitle}>
            1. INFORMACIÓN
          </Text>
          <Text style={styles.text}>
            WOGO S.A.S. es una sociedad constituida conforme a las leyes colombianas, identificada con NIT: 901308186-3, con domicilio en la ciudad de Bogotá D.C. - Colombia, que para los efectos de los presentes términos se denominará EL OPERADOR.
          </Text>
          <Text style={styles.subtitle}>
             2. NATURALEZA JURÍDICA
          </Text>
          <Text style={styles.text}>
            Los presentes términos y condiciones de uso regulan la relación de consumo que une a los CLIENTES FINALES que acceden a la plataforma virtual y al OPERADOR, especialmente en la autorización de uso que otorga éste en favor de aquel.
          </Text>
          <Text style={styles.subtitle}>
             3. DEFINICIONES
          </Text>
          <Text style={styles.text}>
            Comercio Electrónico: Comprende el envío, transmisión, recepción, almacenamiento de mensajes de datos por vía electrónica. Las dudas que surjan respecto de la eficacia y validez de los mensajes de datos y demás actividades vinculadas al comercio electrónico se interpretarán de conformidad con la ley 527 de 1999. 
          </Text>
          <Text style={styles.text}>
            Cookies: Cadenas de texto enviadas virtualmente que son almacenadas por el uso de la Plataforma por el Operador, para la consulta de las actividades y preferencias de los usuarios.
          </Text>
          <Text style={styles.text}>
            CLIENTES FINALES: Toda persona natural o jurídica que, como destinatario final, use la plataforma para comprar, adquirir y disfrutar productos de consumo y servicios que, a través de la misma, ofrezcan las marcas y puntos de venta ALIADOS u oferentes.
          </Text>
          <Text style={styles.text}>
            Datos personales: Es toda información que permite identificar o hacer identificable a una persona física.
          </Text>
          <Text style={styles.text}>
            Expendedor: Persona natural o jurídica que reúne las condiciones establecidas en el numeral 11 del artículo 5 de la ley 1480 de 2011, es decir, quien de manera habitual, directa o indirectamente, comercializa productos y ofrece servicios a través de la plataforma.
          </Text>
          <Text style={styles.text}>
            Contrato de compraventa celebrado por medios electrónicos: Es aquel acuerdo de voluntades celebrado entre el ALIADO y el CLIENTE FINAL, donde éste adquiere un producto o servicio y se obliga realizar un pago a favor del ALIADO o el oferente quien a su vez se obliga a entregar el producto o servicio con las características anunciadas al momento de la compra y en los tiempos determinados en la misma.
          </Text>
          <Text style={styles.text}>
            "Negocio ALIADO" u “oferente”, e incluso, “establecimiento de comercio”: se refieren a agentes terceros, que previamente han acordado cooperar con EL OPERADOR ofreciendo los productos y servicios que se publican a través de nuestra plataforma. Estos son los directamente encargados de entregar el producto o servicio al CLIENTE FINAL con las características anunciadas al momento de la compra y en los tiempos determinados en la misma.
          </Text>
          <Text style={styles.text}>
            Interacción en la plataforma: Facultad de acceso por parte de los CLIENTES FINALES para conocer los productos y servicios exhibidos por el OPERADOR y ofrecidos por los ALIADOS o el oferente, así como la publicidad puesta a disposición en la Plataforma.
          </Text>
          <Text style={styles.text}>
            Calidad: Condición en que un producto cumple con las características inherentes y las atribuidas por la información que se suministre sobre él.
          </Text>
          <Text style={styles.text}>
            Mayor de edad: Persona natural mayor de dieciocho (18) años.
          </Text>
          <Text style={styles.text}>
            Mensajes de datos: La información generada, enviada, recibida, almacenada o comunicada por medios electrónicos, ópticos o similares, como pudieran ser, entre otros, el Intercambio Electrónico de Datos (EDI), Internet, el correo electrónico, el telegrama, el télex o el telefax.
          </Text>
          <Text style={styles.text}>
            Operador de la plataforma o EL OPERADOR: Encargado de administrar operativamente y funcionalmente la Plataforma representado para los efectos de los presentes términos por WOGO S.A.S., o por la persona natural o jurídica que ésta designe.
          </Text>
          <Text style={styles.text}>
            Pasarela de pagos: Servicio que permite la realización de pagos por parte de los CLIENTES FINALES al OPERADOR a través de medios electrónicos utilizando plataformas tecnológicas (software).
          </Text>
          <Text style={styles.text}>
            Plataforma: Aplicativo web y móvil administrado por el OPERADOR que permite la concurrencia en un mercado de oferentes (aliados) y demandantes (CLIENTES FINALES), para la celebración de negocios jurídicos determinados.
          </Text>
          <Text style={styles.text}>
            Publicidad: Es toda forma de comunicación realizada por el OPERADOR, con el fin de brindar información sobre productos, actividades comerciales y comunicar estrategias o campañas publicitarias o de mercadeo, propias o de terceros; realizada como mecanismo de referencia y no como oferta pública.
          </Text>
          <Text style={styles.text}>
            Producto: Bien de consumo exhibido a través de la Plataforma.
          </Text>
          <Text style={styles.text}>
            Servicio: Servicios ofrecidos a través de la plataforma.
          </Text>
          <Text style={styles.text}>
            Ventanas emergentes (Pop-Ups): Ventana o aviso de internet que emerge automáticamente en cualquier momento cuando se utiliza la Plataforma, especialmente utilizado para la formalización del contrato de compra-venta entre CLIENTES FINALES y ALIADOS u oferentes.
          </Text>
          <Text style={styles.subtitle}>
            4. OBJETO
          </Text>
          <Text style={styles.text}>
            Los presentes términos y condiciones regulan la autorización de uso que otorga el Operador a los CLIENTES FINALES, para que éstos ingresen a la plataforma virtual, se informen sobre los productos y servicios de consumo exhibidos, para que sean utilizados como referencia y puedan realizar la transacción de compra-venta directa o indirectamente con los ALIADOS u oferentes.
          </Text>
          <Text style={styles.text}>
            El OPERADOR a través de la Plataforma actúa únicamente como intermediario de las operaciones comerciales entre los ALIADOS y los CLIENTES FINALES y realiza las siguientes acciones: i) exhibe diferentes productos y servicios de consumo de forma publicitaria para que puedan servir de referencia a los CLIENTES FINALES, ii) facilita el encuentro entre CLIENTES FINALES y ALIADOS u oferentes para la realización del vínculo contractual, iii) el pago lo hacen los usuarios directamente a WOGO por medio de diferentes medios de pago como efectivo, tarjeta de crédito, débito, o crédito WOGO iv) sirve de medio de envío de comunicaciones entre los CLIENTES FINALES y ALIADOS u oferentes.
          </Text>
          <Text style={styles.text}>
            La celebración de la relación contractual entre CLIENTES FINALES y ALIADOS u oferentes, se da con CLIENTES FINALES que se encuentren en las zonas de cobertura de la ciudad de Bogotá - Colombia o que, estando en el extranjero o fuera de las zonas de cobertura, compran los productos para que sean entregados en las zonas de cobertura de la ciudad de Bogotá, pagando una contraprestación económica mediante el sistema de pago electrónico por la plataforma electrónica WOGO o en dinero en efectivo, solo en los casos en los que se encuentre habilitado este medio, al momento de la recepción de los productos o servicios, a elección del CLIENTE FINAL.
          </Text>
          <Text style={styles.text}>
            Por intermedio de la plataforma se exhiben productos y servicios que los ALIADOS u oferentes comercializan, para consumo final y sin vocación comercial; lo cual es conocido y aceptado por los CLIENTES FINALES quienes buscan satisfacer una necesidad privada, personal o familiar, y en ningún momento para su comercialización, reventa o cualquier otro tipo de transacción comercial o interés propio que configure una relación comercial.
          </Text>
          <Text style={styles.subtitle}>
             5. PLATAFORMA TECNOLÓGICA QUE PERMITE SU USO
          </Text>
          <Text style={styles.text}>
            Es una plataforma que permite su uso gratuito por dos medios, a saber: i) portal web, y ii) aplicación que se puede descargar en dispositivos móviles por medio de tiendas virtuales de aplicaciones de Apple y de Google (App Store de Apple, Google Play de Google), medios que en adelante y para los efectos de los presentes términos se denominarán conjuntamente “La Plataforma”. Los CLIENTES FINALES podrán utilizar la Plataforma exclusivamente para su uso personal, sin que esto implique el otorgamiento de una licencia del aplicativo de ningún tipo.
          </Text>
          <Text style={styles.text}>
            La Plataforma tiene como propósito principal la intermediación en el proceso de pedidos de WOGO en Colombia, facilitando las relaciones y transacciones entre CLIENTES FINALES y ALIADOS – o demás establecimientos de comercio, debidamente certificados- por medio del cual se centralizan y otorgan al CLIENTE FINAL, todas las herramientas necesarias para que éste pida un producto o servicio a través de la PLATAFORMA, donde se encargará de ejecutar todo el proceso de intermediación desde la recepción del pedido, hasta la efectiva entrega de los productos o servicios solicitados, en el lugar pactado entre el CLIENTE FINAL y el ALIADO. Este último debe asegurar la disponibilidad del producto o servicio, o informar inmediatamente al OPERADOR para que este informe al CLIENTE FINAL en caso de que no estén disponibles los productos o servicios solicitados.
          </Text>
          <Text style={styles.text}>
            En los casos en los que se encuentre habilitado en el proceso de compra la entrega del producto por envío a una dirección especificada por el CLIENTE FINAL, WOGO S.A.S. se encargará de realizar la entrega de los pedidos mediante el servicio de personal contratado directamente por el, y hace un seguimiento del mismo (recibiendo requerimientos, peticiones y reclamos), hasta asegurarse que el pedido fue debidamente entregado y que la relación de consumo puede darse por terminada.
          </Text>
          <Text style={styles.text}>
            Así, LA PLATAFORMA funge como una herramienta que facilita la interacción entre el CLIENTE FINAL y el oferente del producto o servicio.
          </Text>
          <Text style={styles.text}>
            WOGO S.A.S. actuará con la mayor diligencia para que una vez el pedido haya sido confirmado por parte del establecimiento al cual ha sido solicitado, éste llegue de acuerdo a las especificaciones contratadas, incluyendo el precio exacto de los productos, el método de pago, los productos adquiridos, su tamaño y las demás características ofrecidas por medio de la publicidad e información suministradas a los CLIENTES FINALES, previo a la aceptación del pedido, teniendo en cuenta que en caso de discrepancias del CLIENTE FINAL con el producto o servicio prestado, son los ALIADOS u oferentes quienes deben responder por estos factores.
          </Text>
          <Text style={styles.subtitle}>
             6. MODIFICACIÓN
          </Text>
          <Text style={styles.text}>
            El OPERADOR podrá modificar autónomamente y en cualquier momento en aspectos formales, procedimentales o sustanciales los presentes Términos y Condiciones de uso de la Plataforma, los cuales serán actualizados y puestos a disposición de los CLIENTES FINALES en la Plataforma, siendo la última versión publicada la que regulará las relaciones de consumo que se generen al momento de realizarse la transacción. Así mismo, cuenta con plena autonomía para modificar los usos de la Plataforma permitidos a los CLIENTES FINALES, con el único deber de informarlo por un medio virtual que permita su publicación y comunicación al público.
          </Text>
          <Text style={styles.subtitle}>
             DETALLE DEL SERVICIO
          </Text>
          <Text style={styles.subtitle}>
             7. CLIENTE FINAL
          </Text>
          <Text style={styles.text}>
            Toda persona natural o jurídica (sin que la naturaleza de la persona implique una relación comercial) que, como destinatario final, use la plataforma para adquirir y disfrutar productos de consumo y servicios que, a través de la misma, ofrezcan los ALIADOS u oferentes.
          </Text>
          <Text style={styles.text}>
            El CLIENTE FINAL manifiesta a través de la aceptación expresa o tácita que es plenamente capaz para celebración de contratos de compra-venta con los ALIADOS u oferentes a través de la plataforma, calidades que refrenda al momento de generar su registro.
          </Text>
          <Text style={styles.subtitle}>
             8. CONSIDERACIONES GENERALES
          </Text>
          <Text style={styles.text}>
            Se torna indispensable aclarar que WOGO S.A.S ofrece un servicio principalmente de intermediación, por lo cual debe actuar con la diligencia debida en cuanto a la línea de tiempo que inicia al momento de realizar el pedido, hasta la entrega del mismo. En línea con lo anterior WOGO S.A.S no se responsabiliza por la calidad, cantidad y demás condiciones propias de los productos realizados por los ALIADOS u oferentes ya que como bien se mencionó atrás WOGO S.A.S. es el canal mediante el cual el CLIENTE FINAL se vincula directamente con el ALIADO o el oferente.
          </Text>
          <Text style={styles.text}>
            En caso que se hagan pedidos a establecimientos que entre su oferta de productos tiene gamas de licores y cigarrillos, estos solo serán ofrecidos a aquellos CLIENTES FINALES que de conformidad con la legislación colombiana cumplan con la edad legal requerida para la adquisición de estos productos. La edad legal requerida se verificará de acuerdo con los datos suministrados por el usuario y contrastando dicha información con la cédula del usuario, la cual le será exigida al momento de la entrega del producto por quienes entreguen el pedido. En caso de haber suministrado información falsa, el CLIENTE FINAL o quien ejerza la custodia del CLIENTE FINAL será el responsable exclusivo de los potenciales daños que puedan causarse y estará sujeto a las acciones judiciales que puedan ser interpuestas en su contra.
          </Text>
          <Text style={styles.text}>
            Una vez el usuario ha ingresado a LA PLATAFORMA y se ha registrado debidamente, puede proceder a ver las diferentes opciones de ALIADOS, tipos de productos y servicios, locaciones de los establecimientos de comercio, etc. Cuando ha definido a dónde y qué quiere pedir, debe proceder a efectuar su pedido teniendo en cuenta que los términos y condiciones fueron aceptados al momento del registro en LA PLATAFORMA. Para garantizar la comprensión y legibilidad, el usuario también podrá acceder a los términos y condiciones vía el sitio web www.wogoapp.co/terminosycondiciones. Todas las órdenes que se realizan a través de la plataforma son estudiadas en aras de asegurar la disponibilidad, capacidad de entrega, y aceptación por parte nuestra y del ALIADO. Cuando ingresa la orden a la plataforma, se visualiza en la plataforma la compra efectiva o se envía una notificación PUSH en donde se confirma la recepción del pedido, el cual se produce de forma automática con los detalles de la orden. A partir del momento de la confirmación de la compra, el usuario tiene un plazo de cinco (5) minutos en el cual debe informar si los detalles de la orden no son correctos y/o si quiere cancelar la orden, caso último en el que se podría generar un cobro para el usuario por cancelación. Tan pronto se confirma el pedido, y una vez pasados los cinco (5) minutos durante los cuales el CLIENTE FINAL podría modificar o cancelar su pedido, el usuario debe estar atento a las especificaciones de entrega de su producto o de la prestación del servicio contratado, así como los horarios en los que se puede acercar al establecimiento de comercio o punto de venta, a recibir el servicio pagado.
          </Text>
          <Text style={styles.text}>
            Dicho tiempo de entrega es exclusivamente un estimado y el cliente, al hacer su pedido, afirma conocer y aceptar que innumerables factores como el tráfico, el clima, los horarios pico y la capacidad de entrega de algunos ALIADOS, pueden ser limitantes para asegurar la hora de entrega. En todos los casos, tanto EL OPERADOR como los ALIADOS, centrarán todos sus esfuerzos para respetar los tiempos de entrega. Igualmente, el operador hará su mejor esfuerzo para que en los casos en que un pedido no sea enviado, el usuario reciba una compensación por parte de la Compañía o del ALIADO, dependiendo del caso concreto. Durante el tiempo que transcurra entre la confirmación del pedido y la efectiva entrega del mismo, el usuario podrá comunicarse mediante el sistema de tickets de la plataforma en cualquier momento con EL OPERADOR para efectos de hacer preguntas, presentar quejas, entre otros, casos en los cuales siempre recibirá una respuesta en el menor tiempo posible, siempre y cuando estas sean enviadas en el horario hábil, a saber, de domingo a domingo, entre las ocho de la mañana (8:00 a.m.) y siete de la noche (7:00 p.m.).
          </Text>
          <Text style={styles.text}>
            Principalmente, la Compañía actuará como intermediaria y centrará sus esfuerzos en resolver todas las quejas o situaciones problemáticas que se configuren con ocasión a demoras, pedidos incompletos o equivocados, etc.  En todos los casos, sin excepción, las quejas deben ser presentadas en un lenguaje decente y respetuoso, atendiendo a los presupuestos mínimos de cortesía y educación. En caso contrario, EL OPERADOR no estará obligado a proporcionar respuesta alguna, y por el contrario, de acuerdo con su propio criterio, podrá proceder a bloquear al usuario de su base de datos, quedando dicho usuario imposibilitado para utilizar los servicios nuevamente. Dicha acción se le hará saber a cada usuario, junto con las razones que motivaron tal decisión.
          </Text>
          <Text style={styles.text}>
            Mediante el registro del usuario en la aplicación y la aceptación de los presentes términos y condiciones el usuario autoriza al OPERADOR para que le sean enviadas notificación PUSH informándole de promociones, eventos especiales, impulso de productos o servicios y avisos importantes que deban ponerse en conocimiento del usuario por parte del OPERADOR.
          </Text>
          <Text style={styles.text}>
            Después de haberse entregado el producto o prestado el servicio, el usuario recibirá una notificación PUSH mediante el cual se le solicita a éste que califique el servicio y el aliado y proporcione cualquier comentario adicional, de considerarlo pertinente. Todos los comentarios y calificaciones son revisados por el personal del operador y son debidamente registrados en el historial de cada usuario.
          </Text>
          <Text style={styles.text}>
            En caso de que el pedido sea rechazado, el usuario será notificado tan pronto se haya contactado al ALIADO y este haya informado el motivo del rechazo. Así mismo, el usuario será informado del motivo del rechazo.
          </Text>
          <Text style={styles.text}>
            Cuando el pedido es rechazado, el cliente será debidamente informado y se le proporcionará alguna de las siguientes razones:
          </Text>
          <Text style={styles.text}>
            a. El ALIADO está cerrado.
          </Text>
          <Text style={styles.text}>
            b. El producto no está disponible.
          </Text>
          <Text style={styles.text}>
            c. El servicio no está disponible.
          </Text>
          <Text style={styles.text}>
            d. Los datos del usuario son incorrectos o están incompletos.
          </Text>
          <Text style={styles.text}>
            e. Fuera de cobertura del ALIADO.
          </Text>
          <Text style={styles.text}>
            f. Cancelado por petición del usuario.
          </Text>
          <Text style={styles.text}>
            g. No fue posible comunicarse con el cliente.
          </Text>
          <Text style={styles.text}>
            h. El ALIADO tiene inconvenientes en el momento.
          </Text>
          <Text style={styles.text}>
            i. No fue posible comunicarse con el ALIADO.
          </Text>
          <Text style={styles.text}>
            j. El método de pago no está disponible.
          </Text>
          <Text style={styles.text}>
            k. El pedido fue repetido.
          </Text>
          <Text style={styles.text}>
            l. Otros.
          </Text>
          <Text style={styles.text}>
            Una vez recibido el mensaje, se intentará contactar al usuario para preguntarle si desea hacer un nuevo pedido, contactar a otro ALIADO, o hacer alguna otra modificación viable.
          </Text>
          <Text style={styles.subtitle}>
             9. CUENTA DE USUARIO
          </Text>
          <Text style={styles.text}>
            Los CLIENTES FINALES usan como referencia para su compra los productos o servicios que se encuentran exhibidos en la Plataforma, teniendo como condición necesaria la creación de una Cuenta de Usuario, donde se solicitarán datos como nombre, fecha de nacimiento, teléfono, dirección, dirección de correo electrónico; esta información se utiliza para la plena identificación de las personas que pretenden adquirir los productos, para el cumplimiento del contrato, para la prevención de fraudes, para vincular al CLIENTE FINAL con el ALIADO o el oferente y en general para los fines definidos en el acápite Manejo de información, todo conforme a la política de protección de datos personales y disposiciones que reglamentan la materia.
          </Text>
          <Text style={styles.text}>
            El usuario autoriza que se le envíe publicidad o campañas de mercadeo por parte del OPERADOR, a los medios de contacto que relacionó en su perfil de la plataforma, como mensajes SMS al celular, mails al correo electrónico o publicidad dirigida a redes sociales, esto por parte del operador sin que sea posible que este último comparta los datos acá mencionados con terceros por fuera de la presente relación comercial.
          </Text>
          <Text style={styles.text}>
            En caso de encontrarse habilitado en LA PLATAFORMA, los CLIENTES FINALES en caso de tener cuentas en las redes sociales Facebook y Google +, podrán crear su cuenta de usuario con la utilización de las credenciales allí definidas, para lo cual la Plataforma comunicará esta opción. Una vez suministrada la información, se valida por parte del Operador el nombre de usuario y contraseña para acceder a la Plataforma.
          </Text>
          <Text style={styles.text}>
            Podrán los CLIENTES FINALES además de la información obligatoria y facultativa requerida al momento de la creación de la cuenta, suministrar voluntariamente más datos relacionados con su individualización al momento en que cree su propio Perfil dentro de la Plataforma.
          </Text>
          <Text style={styles.text}>
            El uso de las cuentas es personal e intransferible, por lo cual los CLIENTES FINALES no se encuentran facultados para ceder los datos de validación para el acceso a la Plataforma. En caso de olvido de los datos de validación o de usurpación de éstos, es obligación del CLIENTE FINAL informarlo al Operador a través de la opción “olvidó su contraseña” o a través de comunicación enviada al correo electrónico servicioalcliente@wogoapp.co Las cuentas de usuarios serán administradas por el Operador o por la persona que éste designe, teniendo plena facultad para la conservación o no de la cuenta, cuando la información suministrada por los CLIENTES FINALES no sea veraz, completa o segura; o cuando se presente incumplimiento de las obligaciones de los CLIENTES FINALES. En ningún momento el Operador solicitará al CLIENTE FINAL información que NO resulte necesaria para su vinculación con el ALIADO y para la facilitación del pago, por lo tanto los datos de tarjetas débito o crédito, solo se solicitarán al momento de realizar el pago virtual si así lo define el CLIENTE FINAL, éstos datos no serán almacenados por el Operador , serán inscritos directamente en la pasarela de pagos PayU Latam, y se utilizarán directamente por el CLIENTE FINAL en ésta, donde se informará las condiciones de seguridad y privacidad en que se efectúa el mismo.
          </Text>
          <Text style={styles.text}>
            Con la creación de la Cuenta de Usuario, los CLIENTES FINALES están manifestando su voluntad de aceptación expresa e inequívoca de los presentes Términos y Condiciones de uso de la Plataforma.
          </Text>
          <Text style={styles.text}>
            Parágrafo. Autoriza expresamente el CLIENTE FINAL al momento de la aceptación de los presentes Términos, el uso de Cookies por parte del Operador en toda actividad de uso que realice de la Plataforma.
          </Text>
          <Text style={styles.subtitle}>
             10. CAPACIDAD
          </Text>
          <Text style={styles.text}>
            Es claro para el CLIENTE FINAL que la relación contractual que se puede llegar a generar por el uso de la Plataforma será directamente con el ALIADO u oferentes, y consistirá en un contrato de compra-venta celebrado por medios electrónicos, en el cual el CLIENTE FINAL es el comprador y el ALIADO u oferente es el vendedor.
          </Text>
          <Text style={styles.text}>
            En virtud de las condiciones de capacidad legal establecidas en el código civil Colombiano y de la validez de la manifestación de voluntad a través de medios electrónicos establecida en la ley 527 de 1999, los CLIENTES FINALES al momento de la creación de la Cuenta de Usuario, manifiestan expresamente tener capacidad para celebrar el tipo de transacciones que se pueden realizar usando la Plataforma; y con base en lo prescrito en la ley 1098 de 2006 de la República de Colombia los menores de edad cuentan con capacidad para celebrar éste tipo de transacciones, no obstante el Operador deberá: i) Excluir del sistema de información los datos de menores de edad que hayan utilizado la Plataforma; ii) Dar a conocer a las autoridades de cualquier situación de la que tenga conocimiento que ponga en peligro la integridad de un menor de edad; iii) Informar a los menores que se encuentren interesados en adquirir productos a través de la Plataforma usando medios de pago electrónico, que deberán realizar la transacción económica de carácter electrónico a través de sus padres o representantes, previo registro y contratación con éstos; iv) Informar al momento de seleccionar productos de comercialización restringida o prohibida para menores de edad, para que de manera expresa se confirme la edad del CLIENTE FINAL.
          </Text>
          <Text style={styles.subtitle}>
             11. DESCRIPCIÓN DEL SERVICIO
          </Text>
          <Text style={styles.text}>
            El Operador exhibe a través de la Plataforma productos y servicios, que están a disposición de los CLIENTES FINALES para su conocimiento general. Esta comunicación de productos sirve como referencia a los CLIENTES FINALES para su adquisición.
          </Text>
          <Text style={styles.text}>
            Para el proceso de compra los CLIENTES FINALES deben estar plenamente identificados en su Cuenta de Usuario y seguir el siguiente procedimiento:
          </Text>
          <Text style={styles.text}>
            a) Ingresar a la Plataforma especificando los productos o servicios para determinar los que se encuentran disponibles en este sector.
          </Text>
          <Text style={styles.text}>
            b) Si son productos para envío, seleccionar el lugar de entrega. Se debe suministrar por el CLIENTE FINAL la dirección exacta donde se realizará la entrega del (los) producto (s) seleccionado (s), esta dirección debe encontrarse en el rango de cobertura de entrega, en caso de no encontrarse en dicho rango no se permitirá la finalización de la transacción.
          </Text>
          <Text style={styles.text}>
            c) Seleccionar el producto o servicio. Una vez seleccionado se pone a disposición del CLIENTE FINAL las características y valor total del producto por medio de fotografías y notas de referencias, que permiten la plena individualización del producto para el análisis detallado del CLIENTE FINAL.
          </Text>
          <Text style={styles.text}>
            d) Validación del producto o servicio. Cumplido el paso anterior, el operador deberá exhibir al CLIENTE FINAL un resumen del producto en cuanto a sus condiciones generales tales como la marca y la presentación suministrada. Para el caso de los servicios adquiridos mediante la plataforma, el CLIENTE FINAL debe validar los horarios en los cuales puede dirigirse a los puntos de venta del oferente e informarse de manera minuciosa con el fin de no tener inconvenientes con la prestación del servicio adquirido. De esta manera el CLIENTE FINAL podrá validar y confirmar la información y el producto o servicio seleccionado.
          </Text>
          <Text style={styles.text}>
            e) Ingreso del producto o servicio al carrito de compras. Este ingreso corresponde a la voluntad inequívoca del CLIENTE FINAL de adquirir un producto o servicio determinado, ya que se ha informado con suficiencia las características del mismo, teniendo la posibilidad de adquirirlo o no. El Operador tiene total autonomía para limitar el ingreso de productos al carrito de compras con ocasión a la cantidad.
          </Text>
          <Text style={styles.text}>
            f) Valor. Una vez se han agotados los pasos precedentes, se pone a disposición del CLIENTE FINAL el valor a pagar por los productos o servicios seleccionados, el cual se encuentra discriminado unitariamente y en conjunto por todos los productos a adquirir. El valor corresponderá al valor total del producto o servicio incluyendo costos de envío, de transacción e impuestos.
          </Text>
          <Text style={styles.text}>
            g) Pago. El pago que realiza el CLIENTE FINAL lo realiza directamente al operador.
          </Text>
          <Text style={styles.text}>
            h) Forma de pago. El CLIENTE FINAL deberá seleccionar el medio de pago que desea utilizar, teniendo como posibilidades el pago por medio de tarjeta de crédito o con dinero en efectivo en el punto de venta; en este momento se configura la oferta que realiza el CLIENTE FINAL al ALIADO o el oferente.
          </Text>
          <Text style={styles.text}>
            i) Registro. Al momento de definir la forma de pago, el Usuario deberá crear su cuenta personal en la cual se requerirán los datos personales que permitan su identificación, más no su individualización, además de los datos para la realización del pago a través del medio electrónico.
          </Text>
          <Text style={styles.text}>
            j) Resumen y Correo electrónico. Una vez completados los pasos anteriores se le exhibirá a través de una ventana emergente al CLIENTE FINAL un resumen detallado de la transacción y la información completa del ALIADO u oferente con el cual se celebra el contrato de compra-venta.
          </Text>
          <Text style={styles.text}>
            k) pago. En todo caso, sea que el pago realice en dinero en efectivo o a través de tarjeta de crédito y/o débito, en la aplicación aparecerá el listado y el estado de las compras realizadas.
          </Text>
          <Text style={styles.text}>
            l) Entrega. Verificados todos los datos correspondientes a la transacción y al ámbito de cobertura de entrega de productos o servicios, el ALIADO o el oferente entregarán en la dirección suministrada y en el término definido al finalizar la operación, los productos comprados. En caso de no poderse realizar la entrega por razones imputables al CLIENTE FINAL, deberá el operador dejar constancia de este hecho.
          </Text>
          <Text style={styles.text}>
            Parágrafo. El perfeccionamiento del contrato de compra venta celebrado por medios electrónicos se da en el momento en que el CLIENTE FINAL final hace el pago al operador del producto o servicio del ALIADO o el oferente; dicha aceptación corresponde al momento en que el CLIENTE FINAL selecciona el medio de pago. Verificados los pasos de proceso de compra el ALIADO o el oferente, por intermedio del Operador puede aceptar total o parcialmente la oferta realizada por el CLIENTE FINAL, evento en el cual informará en el resumen sobre cuales productos se celebra el contrato.
          </Text>
          <Text style={styles.subtitle}>
            Parágrafo Segundo: Términos y Condiciones de uso de WOGO.
          </Text>
          <Text style={styles.text}>
            El usuario acepta y reconoce que estos términos y condiciones son aplicables a los casos en que, para la prestación del servicio, las características del mismo, sus condiciones técnicas, económicas y jurídicas han sido negociadas y pactadas de mutuo acuerdo entre las partes del contrato (CLIENTE FINAL y ALIADO o el oferente) y, por lo tanto, son el resultado del acuerdo particular y directo entre las partes. 2. Para todos los efectos, WOGO S.A.S. funge como una simple plataforma virtual, mediante la cual, el usuario (CLIENTE FINAL) podrá solicitar, a un ALIADO o oferente, un servicio o producto, el cual se hará por mutuo acuerdo entre las partes. WOGO S.A.S aclara que la relación será directamente entre el CLIENTE FINAL y el ALIADO o el oferente y se mantendrá al margen y no será responsable ni siquiera solidariamente de cualquier hecho que pueda generarse de la relación entre las dos partes. 3. El usuario acepta y reconoce que cualquier producto o servicio que solicite lo hará bajo su propio riesgo. Esto quiere decir que, salvo en casos de servicio de mensajería postal donde (i) se averíe o exista un daño en el paquete, o (ii) haya pérdida del paquete sin que haya sido por fuerza mayor o caso fortuito, WOGO S.A.S., será responsable ante el usuario. 4. Cualquier PQR que los clientes decidan interponer ante WOGO S.A.S en relación al servicio del ALIADO o el oferente, deberán hacerlo al correo de servicioalcliente@wogoapp.co.
          </Text>
          <Text style={styles.subtitle}>
             12. OBLIGACIONES DEL OPERADOR
          </Text>
          <Text style={styles.text}>
            n virtud de los presentes términos el Operador, se obliga a (1) Suministrar información cierta, fidedigna, suficiente, clara y actualizada respecto de los productos y servicios que se exhiben; (2) Indicar las características generales de los productos y servicios para que sirvan de referencia a los CLIENTES FINALES, para el efecto son marca, presentación y descripciones; (3) Informar suficientemente sobre los medios habilitados para que los CLIENTES FINALES realicen el pago; (4) Informar en el momento indicado y con suficiencia los datos de los ALIADOS o del oferente con los cuales los CLIENTES FINALES han de celebrar el contrato de compra-venta, exceptuando los datos de contacto o direcciones exactas que se otorgan luego de la compra; (5) Notificar en la misma aplicación cuando una compra haya sido efectiva o rechazada; (6) Poner a disposición de los CLIENTES FINALES los términos y condiciones de uso de la plataforma de forma actualizada; (7) Utilizar la información únicamente para los fines establecidos en los presentes términos; (8) Utilizar mecanismos de información y validación durante la transacción como ventanas emergentes (Pop Ups), que permitan al CLIENTE FINAL aceptar o no cada paso del proceso de compra. (especificar el valor a pagar).
          </Text>
          <Text style={styles.subtitle}>
            13. OBLIGACIONES DEL CLIENTE FINAL
          </Text>
          <Text style={styles.text}>
            Con la aceptación de los presentes términos el CLIENTE FINAL se obliga a: (1) Suministrar información veraz y fidedigna al momento de crear su Cuenta de Usuario; (2) Abstenerse de transferir a terceros los datos de validación o accesos a su perfil en la plataforma; (3) Abstenerse de utilizar la Plataforma para realizar actos contrarios a la moral, el orden público y buenas costumbres en contra del Operador, los ALIADOS o los oferentes o de terceros; (4) Pagar oportunamente mediante efectivo, tarjeta de crédito y/o débito la contraprestación económica definida en el proceso de compra; (5) Informar inmediatamente al Operador en caso de olvido o usurpación de los datos de validación; (6) Abstenerse de realizar conductas atentatorias del funcionamiento de la Plataforma; (7) Abstenerse de suplantar la identidad de otros CLIENTES FINALES; (8) Abstenerse de descifrar, descompilar o desensamblar cualquier elemento de la Plataforma, códigos de desarrollo o de cualquiera de sus partes; (9) Habilitar la utilización de ventanas emergentes durante la operación; (10) En general todas aquellas conductas necesarias para la ejecución del negocio jurídico, como i) la recepción de los productos solicitados, ii) exhibir la identificación en caso de venta de productos de uso restringido, iii) verificar al momento de la validación que los productos seleccionados si corresponden a los necesitados, iv) informarse sobre las instrucciones de uso de los productos e instrucciones y condiciones de prestación de los servicios.
          </Text>
          <Text style={styles.text}>
            Parágrafo: La compañía no garantiza que el portal opere libre de errores o que su servidor se encuentre libre de virus de computadores u otros mecanismos dañinos. Si el uso del portal o del material resulta en la necesidad de solicitar servicio de reparación o mantenimiento a sus equipos o información o de reemplazar sus equipos o información, WOGO S.A.S. no es responsable por los costos que ello implique.
          </Text>
          <Text style={styles.text}>
            El portal y el material se ponen a disposición de los CLIENTES FINALES en el estado en que se encuentren. No se otorga garantía alguna sobre la exactitud, confiabilidad u oportunidad del material, los servicios, los textos, el software, las gráficas y los links o vínculos.
          </Text>
          <Text style={styles.text}>
            En ningún caso, la compañía, sus proveedores o cualquier persona mencionada en el portal, será responsable por daños de cualquier naturaleza, resultantes del uso o la imposibilidad de usarlos.
          </Text>
          <Text style={styles.subtitle}>
             14. DESCRIPCIÓN DE LOS PRODUCTOS Y SERVICIOS
          </Text>
          <Text style={styles.text}>
            Los productos y servicios exhibidos y ofrecidos por el Operador cuentan con una descripción general; esta descripción se realiza por el Operador a partir de prácticas legales de visualización, que en todo caso dependen el dispositivo en donde el CLIENTE FINAL observe el producto o servicio. La disponibilidad será definida en cada caso en concreto al momento en que el CLIENTE FINAL realice el proceso de obtención de pedir el producto o servicio dentro del catálogo de opciones que el ALIADO o el oferente disponga en la plataforma, WOGO S.A.S. no se hará responsable en caso que el ALIADO o el oferente no tenga el producto o servicio que el cliente solicitó. Dentro del proceso de compra el CLIENTE FINAL determinará qué acción debe realizar el ALIADO o el ofertante en caso de no hallar el producto o servicio solicitado, entre: (i) Cumplir con el pedido excluyendo el producto o servicio solicitado no hallado, caso en el cual se descontará su valor del valor total del pedido y, en caso de ser sólo un producto o servicio y no se encuentra disponible, deberá elegir entre la cancelación del pedido o el cumplimiento con uno sustituto o similar en precio y tipo; (ii) Comunicarse con el CLIENTE FINAL para concertar el cumplimiento con un producto sustituto;
          </Text>
          <Text style={styles.text}>
            Es claro para el CLIENTE FINAL que el Operador no es productor, proveedor, expendedor, agente, distribuidor y en general ningún tipo de comercializador de los productos o servicios que exhibe, ya que opera solo como una plataforma tecnológica que permite el encuentro de CLIENTES FINALES y ALIADOS u oferentes para la configuración de relaciones de consumo, su única función en es la de ser intermediario entre el ALIADO o el oferente y el CLIENTE FINAL.
          </Text>
          <Text style={styles.text}>
            Los productos de uso restringido, como tabaco y bebidas embriagantes, solo se comercializarán por parte del ALIADO o el oferente a CLIENTES FINALES que cuenten con mayoría de edad, quienes manifiestan expresamente esta calidad al momento de registrarse o de seleccionar el producto.
          </Text>
          <Text style={styles.text}>
            En el evento de haber solicitado junto con los productos de uso restringido otros de diferente calidad e igualmente se incumpla la obligación acá descrita, aplicarán las mismas consecuencias jurídicas aquí definidas, pero solo en relación con los productos de uso restringido.
          </Text>
          <Text style={styles.text}>
            El Operador se reserva el derecho de actualizar, modificar y/o descontinuar los productos y servicios exhibidos en la Plataforma.
          </Text>
          <Text style={styles.subtitle}>
             15. GARANTÍA
          </Text>
          <Text style={styles.text}>
            Entiende y acepta el CLIENTE FINAL que la relación de consumo se genera directamente con los ALIADOS o los oferentes, por lo tanto las reclamaciones por garantía se deben realizar directamente a los ALIADOS o los oferentes, quienes tienen la obligación de cumplir con las reclamaciones en los términos definidos en la ley 1480 de 201.
          </Text>
          <Text style={styles.subtitle}>
            CONSIDERACIONES FINALES 
          </Text>
          <Text style={styles.subtitle}>
            16. CONTENIDOS
          </Text>
          <Text style={styles.text}>
            A través de la Plataforma el Operador podrá poner a disposición de los CLIENTES FINALES información de carácter comercial y publicitario, propio o de terceros de conformidad a las buenas costumbres comerciales. En estos casos el Operador no avala, garantiza o compromete su responsabilidad frente a los servicios y/o productos que se comercialicen por éstos terceros, ya que la Plataforma sirve como canal de comunicación y publicidad, mas no como herramienta final de prestación de servicios; en consecuencia es total responsabilidad de los CLIENTES FINALES el acceso a los sitios que remite la publicidad, asumiendo la obligación de verificar y conocer los términos de los servicios ofrecidos por los terceros.
          </Text>
          <Text style={styles.text}>
            Toda la información puesta a disposición en la Plataforma como imágenes, publicidad, nombres, marcas, lemas y demás elementos de propiedad intelectual; son utilizados legítimamente por el Operador sea porque son de su propiedad, porque tienen autorización para ponerlos a disposición o porque en virtud de las decisiones 351 de 1993 y 486 de 2000 de la Comunidad Andina de Naciones, o en virtud de la ley 23 de 1982 se encuentra facultado para hacerlo.
          </Text>
          <Text style={styles.subtitle}>
             17. FUNCIONAMIENTO DE LA PLATAFORMA
          </Text>
          <Text style={styles.text}>
            El Operador administra directamente o por medio de terceras personas la Plataforma, toda la información que se comunica allí corresponde a información cierta y actualizada. En ningún caso responderá por daños directos o indirectos que sufra el CLIENTE FINAL por la utilización o incapacidad de utilización de la Plataforma.
          </Text>
          <Text style={styles.text}>
            La plataforma se encuentra disponible las 24 horas del día para su acceso y consulta, para la realización de transacciones la disponibilidad de la Plataforma es de 24 horas al día, dependiendo de la disponibilidad de los ALIADOS o los oferentes. El Operador realiza los mejores esfuerzos para mantener en operación la Plataforma, pero en ningún caso garantiza disponibilidad y continuidad permanente de la Plataforma.
          </Text>
          <Text style={styles.text}>
            El Operador se reserva el derecho de cancelar las cuentas de usuarios y/o de prohibir el acceso a la Plataforma a los CLIENTES FINALES que realicen conductas violatorias de los presentes términos o que incumplan las obligaciones contraídas.
          </Text>
          <Text style={styles.subtitle}>
             18. DERECHO DE RETRACTO
          </Text>
          <Text style={styles.text}>
            Debido a que los productos que se comercializan a través de la Plataforma son productos perecederos, el Operador informa a los CLIENTES FINALES que los ALIADOS o los oferentes no se encuentran obligados a otorgar el derecho de retracto consagrado en el artículo 47 de la ley 1480 de 2011. 
          </Text>
          <Text style={styles.subtitle}>
            19. COMERCIO ELECTRÓNICO
          </Text>
          <Text style={styles.text}>
            En cumplimiento de las disposiciones colombianas sobre mensajes de datos según la ley 527 de 1999, se comunica que la legislación nacional reconoce validez a los mensajes de datos y por tanto ellos adquieren carácter y entidad probatoria. En consecuencia, entienden los CLIENTES FINALES, que mediante el cruce de mensajes de datos los intervinientes pueden dar lugar al nacimiento, modificación y extinción de obligaciones, siendo de su resorte exclusivo el contenido, consecuencias, responsabilidades y efectos de la información generada. 
          </Text>
          <Text style={styles.text}>
            La transacción de consumo que nace por este medio entre CLIENTES FINALES y ALIADOS u oferentes, es la celebración de un contrato de compra-venta por medios electrónicos, el cual se describe en la ventana emergente que acepta el CLIENTE FINAL al momento de la celebración del negocio jurídico, en ningún momento se configura relación contractual diferente como suministro, distribución o demás similares.
          </Text>
          <Text style={styles.subtitle}>
             20. MANEJO DE INFORMACIÓN
          </Text>
          <Text style={styles.text}>
            La información recolectada por el Operador en las transacciones realizadas, es suministrada por los CLIENTES FINALES de forma libre y voluntaria, para que esta sea administrada por el Operador o por quien éste designe para el cumplimiento de los deberes adquiridos, lo que implica su recolección; almacenamiento en servidores o repositorios del Operador o de terceros; circulación de los mismos dentro de la organización del Operador; comunicación a los CLIENTES FINALES información comercial, publicitaria y de mercadeo relacionada con su actividad comercial.
          </Text>
          <Text style={styles.text}>
            Así mismo, los datos recolectados serán objeto de análisis para fines de mejorar la estrategia de negocios del portal web, apoyada en herramientas de inteligencia de negocios y minería de datos, que permiten adquirir conocimientos prospectivos para fines de predicción, clasificación y segmentación.
          </Text>
          <Text style={styles.text}>
            El CLIENTE FINAL podrá ejercer su derecho de conocer, actualizar, modificar y suprimir los datos personales existentes en las bases de datos asociadas a la Plataforma. Para ello deberá realizar la solicitud de consulta, reclamo o supresión a la dirección electrónica atencionalcliente@wogoapp.co detallando las modificaciones a realizar y aportando los documentos que lo soportan.
          </Text>
          <Text style={styles.text}>
            El Operador es responsable del tratamiento de la información personal recolectada a través del portal web, responsabilidad que podrá delegar en un tercero, en calidad de responsable o encargado de la información, asegurando contractualmente adecuado tratamiento de la misma
          </Text>
          <Text style={styles.subtitle}>
             21. DOMICILIO Y LEGISLACIÓN APLICABLE
          </Text>
          <Text style={styles.text}>
            Los presentes Términos y Condiciones de Uso de la Plataforma se acogen en el territorio Colombiano, conforme a su normatividad general y sectorial. Su adopción implica el ejercicio de su libre voluntad y que la relación que surge de este documento se regirá en todos sus efectos por su contenido y en su defecto por la ley comercial colombiana.
          </Text>
          <Text style={styles.subtitle}>
             22. ACEPTACIÓN TOTAL DE LOS TÉRMINOS
          </Text>
          <Text style={styles.text}>
            El CLIENTE FINAL manifiesta expresamente tener capacidad legal para usar la Plataforma y para celebrar las transacciones de consumo que se puedan generar con los ALIADOS u oferentes; así mismo, manifiesta haber suministrado información real, veraz y fidedigna; por ende de forma expresa e inequívoca declara que ha leído, que entiende y que acepta la totalidad de las situaciones reguladas en el presente escrito de Términos y Condiciones de Uso de la Plataforma, por lo que se compromete al cumplimiento total de los deberes, obligaciones, acciones y omisiones aquí expresadas.
          </Text>
          <Text style={styles.text}>
            En caso que CLIENTES FINALES de otros países utilicen la Plataforma se sujetan completamente a lo dispuesto en los presentes términos.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    textAlign: 'left',
    marginBottom: 10,
  },
  boldText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.black,
    textAlign: 'justify',
    marginBottom: 10,
  },
});

export default Terms;
