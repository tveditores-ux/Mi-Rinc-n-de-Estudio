export function PaginaEstudio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pergamino-50 to-pergamino-100 pb-36">
      <nav className="sticky top-11 z-40 border-b border-pergamino-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-5 py-4 sm:px-8">
          <h1 className="font-serif text-2xl font-semibold text-tinta-900">Rincón de Estudio</h1>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <article className="space-y-8 font-sans text-tinta-800">
          {/* Encabezado */}
          <section className="rounded-2xl border border-oro-200 bg-oro-50 p-8 text-center">
            <h2 className="font-serif text-3xl font-semibold text-tinta-900 sm:text-4xl">
              Criar desde lo que hemos recibido del Padre
            </h2>
            <p className="mt-4 text-sm text-tinta-600">Reunión de padres de adolescentes · 90 minutos</p>
          </section>

          {/* Idea Central */}
          <section>
            <div className="rounded-xl border-l-4 border-vino-600 bg-vino-50 p-6">
              <h3 className="font-serif text-lg font-semibold text-vino-900">Idea central</h3>
              <p className="mt-2 text-tinta-700">
                No aprendemos a ser padres solamente observando a nuestros hijos. Aprendemos a ser padres mirando al
                Padre.
              </p>
            </div>
          </section>

          {/* Objetivo */}
          <section>
            <h3 className="mb-4 font-serif text-xl font-semibold text-tinta-900">Objetivo</h3>
            <p className="rounded-lg bg-white p-4 text-tinta-700 shadow-sm">
              Conversar, escucharnos, comprender mejor esta etapa y descubrir cómo la manera en que Dios se relaciona
              con nosotros puede orientar nuestra relación con nuestros hijos.
            </p>
          </section>

          {/* Sección 1: Conectarnos */}
          <section className="space-y-4 rounded-2xl border border-pergamino-300 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-oro-600 font-serif font-semibold text-white">
                1
              </span>
              <h3 className="font-serif text-2xl font-semibold text-tinta-900">Conectarnos</h3>
              <span className="ml-auto text-sm text-tinta-500">10 min</span>
            </div>

            <div className="space-y-3 border-t border-pergamino-200 pt-4 text-tinta-700">
              <div>
                <p className="font-semibold text-tinta-900">Pregunta inicial:</p>
                <p className="mt-1 italic">¿Qué disfrutas de tener un hijo adolescente?</p>
              </div>
              <div>
                <p className="font-semibold text-tinta-900">Luego:</p>
                <p className="mt-1 italic">¿Qué está resultando difícil en esta etapa?</p>
              </div>
              <div className="rounded-lg bg-azul-50 p-3">
                <p className="font-semibold text-azul-900">Regla: escuchamos antes de aconsejar.</p>
              </div>
            </div>
          </section>

          {/* Sección 2: Conversar */}
          <section className="space-y-4 rounded-2xl border border-pergamino-300 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-oro-600 font-serif font-semibold text-white">
                2
              </span>
              <h3 className="font-serif text-2xl font-semibold text-tinta-900">Conversar</h3>
              <span className="ml-auto text-sm text-tinta-500">20 min</span>
            </div>

            <div className="space-y-3 border-t border-pergamino-200 pt-4 text-tinta-700">
              <p className="font-semibold text-tinta-900">En grupos de 4 o 5:</p>
              <ul className="list-inside space-y-2">
                <li>· ¿Qué ha cambiado más en nuestra relación con nuestros hijos?</li>
                <li>· ¿Qué nos cuesta entender de ellos?</li>
                <li>· ¿En qué situaciones sentimos más la tentación de controlar?</li>
              </ul>

              <div className="rounded-lg border-l-4 border-verde-600 bg-verde-50 p-4">
                <p className="font-semibold text-verde-900">
                  Transición: Nuestros hijos están cambiando, pero nosotros también necesitamos aprender a relacionarnos
                  con ellos de una manera nueva.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 3: Enseñanza */}
          <section className="space-y-4 rounded-2xl border border-pergamino-300 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-oro-600 font-serif font-semibold text-white">
                3
              </span>
              <h3 className="font-serif text-2xl font-semibold text-tinta-900">Enseñanza</h3>
              <span className="ml-auto text-sm text-tinta-500">30 min</span>
            </div>

            <div className="space-y-6 border-t border-pergamino-200 pt-4">
              <div>
                <h4 className="font-serif text-lg font-semibold text-tinta-900">Criar desde lo que hemos recibido del Padre</h4>
              </div>

              {/* Subsección 1 */}
              <div className="space-y-3 rounded-lg bg-pergamino-50 p-5">
                <p className="font-serif text-lg font-semibold text-tinta-900">Mateo 3:17</p>
                <p className="italic text-tinta-700">
                  "Este es mi Hijo amado; estoy muy complacido con él."
                </p>
                <p className="text-sm text-tinta-600">
                  Antes de preguntarnos "¿cómo manejo a mi hijo?", preguntémonos: "¿Cómo me ha tratado mi Padre?"
                </p>
              </div>

              {/* Subsección 2 */}
              <div>
                <h5 className="mb-3 font-semibold text-tinta-900">EL PADRE CONOCE ANTES DE CORREGIR</h5>
                <div className="space-y-3 rounded-lg bg-pergamino-50 p-5">
                  <p className="font-serif text-base font-semibold text-tinta-900">Salmo 139:1-4</p>
                  <p className="text-tinta-700">
                    Dios conoce nuestros procesos, preguntas y temores.
                  </p>
                  <p className="text-tinta-700">
                    Con nuestros hijos, antes de reaccionar ante una conducta, aprendamos a preguntar: "¿Qué está pasando contigo?"
                  </p>
                  <p className="font-semibold text-tinta-800">Escuchar antes de corregir.</p>
                </div>
              </div>

              {/* Subsección 3 */}
              <div>
                <h5 className="mb-3 font-semibold text-tinta-900">EL PADRE AFIRMA IDENTIDAD ANTES DE EXIGIR CONDUCTA</h5>
                <div className="space-y-3 rounded-lg bg-pergamino-50 p-5">
                  <p className="font-serif text-base font-semibold text-tinta-900">Mateo 3:16-17</p>
                  <p className="text-tinta-700">
                    Antes del ministerio público de Jesús, el Padre afirma: "Mi Hijo amado."
                  </p>
                  <p className="text-tinta-700">
                    Nuestros hijos necesitan límites y responsabilidad, pero también necesitan saber que su valor no está permanentemente en negociación.
                  </p>
                  <div className="mt-3 rounded bg-vino-100 p-3 font-semibold text-vino-900">
                    Pregunta: Si mi hijo pudiera describir lo que yo siento por él, ¿qué diría?
                  </div>
                </div>
              </div>

              {/* Subsección 4 */}
              <div>
                <h5 className="mb-3 font-semibold text-tinta-900">EL PADRE GUÍA SIN CONTROLAR</h5>
                <div className="space-y-3 rounded-lg bg-pergamino-50 p-5">
                  <p className="font-serif text-base font-semibold text-tinta-900">Romanos 8:14</p>
                  <p className="italic text-tinta-700">
                    "Porque todos los que son guiados por el Espíritu de Dios son hijos de Dios."
                  </p>
                  <p className="text-tinta-700">
                    La meta no es que nuestros hijos dependan siempre de nuestra voz, sino enseñarles a discernir y caminar con Dios.
                  </p>
                  <div className="mt-3 rounded bg-vino-100 p-3 font-semibold text-vino-900">
                    Pregunta: ¿En qué área necesito acompañar más y controlar menos?
                  </div>
                </div>
              </div>

              {/* Subsección 5 */}
              <div>
                <h5 className="mb-3 font-semibold text-tinta-900">EL PADRE PERMANECE DURANTE LOS PROCESOS</h5>
                <div className="space-y-3 rounded-lg bg-pergamino-50 p-5">
                  <p className="font-serif text-base font-semibold text-tinta-900">Lucas 15:11-24</p>
                  <p className="text-tinta-700">
                    El padre no aprueba la decisión del hijo, pero tampoco deja de ser su padre.
                  </p>
                  <ul className="mt-2 list-inside space-y-1 text-tinta-700">
                    <li>· Podemos confrontar sin humiliar.</li>
                    <li>· Poner límites sin retirar afecto.</li>
                    <li>· Estar en desacuerdo sin romper la relación.</li>
                  </ul>
                  <p className="mt-3 font-semibold text-tinta-800">
                    La gracia no elimina los límites; cambia la manera en que ponemos los límites.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 4: Aplicación */}
          <section className="space-y-4 rounded-2xl border border-pergamino-300 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-oro-600 font-serif font-semibold text-white">
                4
              </span>
              <h3 className="font-serif text-2xl font-semibold text-tinta-900">Aplicación</h3>
              <span className="ml-auto text-sm text-tinta-500">15 min</span>
            </div>

            <div className="space-y-3 border-t border-pergamino-200 pt-4 text-tinta-700">
              <p className="font-semibold text-tinta-900">Conversación en grupos:</p>
              <ul className="list-inside space-y-2">
                <li>· ¿Cuál de estas cuatro características del Padre necesito desarrollar más?</li>
                <li>· ¿Qué conversación con mi hijo he estado evitando?</li>
                <li>· ¿Qué puedo hacer esta semana para acercarme a él sin intentar corregirlo?</li>
              </ul>
            </div>
          </section>

          {/* Consejos */}
          <section className="space-y-4">
            <h3 className="font-serif text-xl font-semibold text-tinta-900">Dos consejos para esta semana</h3>

            <div className="space-y-3">
              <div className="rounded-lg border-l-4 border-verde-600 bg-verde-50 p-5">
                <p className="font-semibold text-verde-900">1. No conviertas cada conversación en una corrección.</p>
                <p className="mt-2 text-verde-800">
                  Si cada acercamiento termina en una instrucción o advertencia, dejará de acercarse.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-azul-600 bg-azul-50 p-5">
                <p className="font-semibold text-azul-900">2. Antes de reaccionar: ora, pregunta, escucha y responde.</p>
                <p className="mt-2 text-azul-800">
                  No todo requiere una reacción inmediata. A veces el Espíritu Santo nos guía precisamente en ese espacio entre lo que nuestro hijo hizo y nuestra respuesta.
                </p>
              </div>
            </div>
          </section>

          {/* Cierre */}
          <section className="rounded-2xl border-2 border-oro-500 bg-oro-50 p-8">
            <h3 className="mb-4 font-serif text-xl font-semibold text-tinta-900">Reflexión final</h3>
            <div className="space-y-2 text-tinta-800">
              <p>Nuestros hijos necesitan dirección, pero también <span className="font-semibold">presencia</span>.</p>
              <p>Necesitan límites, pero también <span className="font-semibold">gracia</span>.</p>
              <p>Necesitan corrección, pero también <span className="font-semibold">afirmación</span>.</p>
              <p>
                Necesitan escuchar nuestra voz, pero también aprender a reconocer la voz del{" "}
                <span className="font-semibold">Espíritu</span>.
              </p>
            </div>
          </section>

          {/* Versículo final */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <p className="font-serif text-base italic text-tinta-700">
              "Antes de ser padres, somos hijos. Y mientras aprendemos a recibir del Padre, aprendemos también a entregar a nuestros hijos lo que hemos recibido de Él."
            </p>
            <p className="mt-4 font-serif font-semibold text-tinta-900">Efesios 6:4</p>
            <p className="text-sm italic text-tinta-600">
              "Padres, no hagan enojar a sus hijos, sino críenlos según la disciplina e instrucción del Señor."
            </p>
          </section>

          {/* Oración */}
          <section className="rounded-2xl border border-vino-200 bg-vino-50 p-8">
            <h3 className="mb-4 font-serif text-lg font-semibold text-vino-900">Oración</h3>
            <p className="font-sans italic leading-relaxed text-vino-900">
              Padre, enséñanos a tratar a nuestros hijos desde lo que hemos recibido de ti. Danos sabiduría para saber cuándo hablar, cuándo escuchar, cuándo corregir, cuándo esperar y cuándo simplemente permanecer cerca. Que nuestros hijos puedan experimentar a través de nosotros tu amor, tu paciencia, tu verdad y tu gracia.
            </p>
            <p className="mt-4 text-center font-serif font-semibold text-vino-900">Amén</p>
          </section>
        </article>
      </main>
    </div>
  );
}
