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
