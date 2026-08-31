export const CATEGORIES = [
    {
        name: 'Argentina',
        companies: [
            {
                symbol: 'YPFD.BA', name: 'YPF', tvSymbol: 'BCBA:YPFD',
                sector: 'Energía y Commodities', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/ypf.com',
                newsQuery: 'YPF argentina OR YPFD OR "Vaca Muerta"',
                description: 'La mayor petrolera argentina con control estatal, líder en la exploración y producción de hidrocarburos en Vaca Muerta.',
                planDeNegocios: 'Foco estratégico en el desarrollo no convencional de Vaca Muerta, desinvirtiendo en áreas convencionales maduras. Proyectos clave: oleoducto Vaca Muerta Sur y planta de GNL para exportación a escala global.',
                fundamentosClave: ['Producción diaria (boe/d) en yacimientos no convencionales.','Costo de extracción (Lifting Cost) por barril.','Margen EBITDA (objetivo 30-35%).','Nivel de apalancamiento Net Debt / EBITDA (< 1.5x).','Plan de desinversión de activos convencionales maduros.'],
                analisisProfesional: 'Al ser productora integrada, YPF amortigua caídas del Brent mediante el precio local de combustibles. Monitorear el flujo de caja operativo y las regulaciones locales ante escenarios de crudo por debajo de USD 65.'
            },
            {
                symbol: 'VIST', name: 'Vista Energy', tvSymbol: 'NYSE:VIST',
                sector: 'Energía y Commodities', riskLevel: 'alto',
                logo: 'https://logo.clearbit.com/vistaenergy.com',
                newsQuery: 'Vista Energy OR VIST OR "Vaca Muerta"',
                description: 'Operador puro e independiente de Vaca Muerta con bajos costos de producción y perfil marcadamente exportador.',
                planDeNegocios: 'Modelo "pure play" en Vaca Muerta con objetivo de duplicar producción hacia 100,000 boe/d. Desarrollo intensivo del bloque Bajada del Palo Oeste con exportación directa de crudo Medanito.',
                fundamentosClave: ['Lifting cost ultra-bajo (USD 4.5-5.5 por barril).','Generación de Free Cash Flow positivo.','Velocidad de perforación y completación de pozos.','Precio neto de realización (Netback) por barril exportado.','Apalancamiento neto (< 1x EBITDA).'],
                analisisProfesional: 'Vista es altamente sensible al precio internacional del Brent. Su bajísimo costo de desarrollo le otorga resiliencia ante ciclos bajistas prolongados del crudo.'
            },
            {
                symbol: 'PAMP.BA', name: 'Pampa Energía', tvSymbol: 'BCBA:PAMP',
                sector: 'Energía y Commodities', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/pampaenergia.com',
                newsQuery: 'Pampa Energia PAMP argentina',
                description: 'Conglomerado energético integrado: líder en generación eléctrica y producción de gas natural en Neuquén.',
                planDeNegocios: 'Consolidación como productor de gas en la Cuenca Neuquina orientado al Plan Gas.Ar, y expansión en generación renovable (parques eólicos) y termoeléctrica eficiente.',
                fundamentosClave: ['Volumen diario de gas entregado (MMm3/d).','Precio contratado de gas bajo Plan Gas y cobros de Cammesa.','Factor de capacidad eólico y tarifas reguladas.','Flujo de caja del plan de recompra de acciones.'],
                analisisProfesional: 'Pampa destaca por su diversificación. Una parte sustancial de su facturación está contractualmente dolarizada, lo que la hace más defensiva que YPF o Vista ante caídas del crudo.'
            },
            {
                symbol: 'TGSU2.BA', name: 'TGS', tvSymbol: 'BCBA:TGSU2',
                sector: 'Energía y Commodities', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/tgs.com.ar',
                newsQuery: 'Transportadora de Gas del Sur TGSU2 TGS',
                description: 'Líder en transporte de gas natural en Argentina y procesamiento de líquidos de gas en planta Cerri.',
                planDeNegocios: 'Expansión de capacidad de transporte para el gas de Vaca Muerta, exportación a países limítrofes y maximización de exportaciones de GLP y gasolina natural.',
                fundamentosClave: ['Volúmenes de gas transportados (MMm3/d).','Precios internacionales de líquidos (GLP).','Actualizaciones tarifarias de transporte reguladas por el Estado.'],
                analisisProfesional: 'TGS se beneficia directamente del crecimiento de Vaca Muerta. Su división de procesamiento de líquidos en Cerri exporta a precios internacionales, generando cobertura en dólares muy atractiva.'
            },
            {
                symbol: 'GGAL.BA', name: 'Grupo Galicia', tvSymbol: 'BCBA:GGAL',
                sector: 'Finanzas y Fintech', riskLevel: 'alto',
                logo: 'https://logo.clearbit.com/galicia.com.ar',
                newsQuery: 'Galicia GGAL argentina OR "Grupo Galicia"',
                description: 'El mayor grupo financiero de capitales privados de Argentina: banca minorista, corporativa y seguros.',
                planDeNegocios: 'Crecimiento de escala mediante la absorción de activos de HSBC Argentina. Foco en la transformación digital del crédito y canalización de liquidez hacia el crédito privado productivo.',
                fundamentosClave: ['Margen Neto de Interés (NIM).','Retorno sobre Capital (ROE) y sobre Activos (ROA).','Ratio de Morosidad (NPL) y previsiones de incobrabilidad.','Crecimiento real de la cartera de préstamos al sector privado.','Capitalización (Tier 1).'],
                analisisProfesional: 'Los bancos argentinos migran del arbitraje de títulos públicos al crédito genuino al sector privado. Si la tasa real del BCRA baja, el margen inmediato se achica pero impulsa la demanda de préstamos a mediano plazo.'
            },
            {
                symbol: 'BMA.BA', name: 'Banco Macro', tvSymbol: 'BCBA:BMA',
                sector: 'Finanzas y Fintech', riskLevel: 'alto',
                logo: 'https://logo.clearbit.com/macro.com.ar',
                newsQuery: 'Banco Macro BMA argentina',
                description: 'Banco de capitales nacionales con fuerte presencia en el interior del país, líder en préstamos regionales.',
                planDeNegocios: 'Fortalecimiento post-integración de Banco Itaú Argentina. Red física con servicios digitales integrados, apuntando a segmentos medios/altos, pymes y recaudación de provincias.',
                fundamentosClave: ['Rentabilidad por sucursal post-fusión.','Margen bruto de intermediación financiera.','Índice de eficiencia operativa.','Calidad de cartera en consumo minorista e interior.','Depósitos de bajo costo como base de fondeo.'],
                analisisProfesional: 'Macro cuenta con una estructura de depósitos atomizada y de bajo costo en el interior, lo que le otorga resiliencia en contextos volátiles. Suele defender mejor sus múltiplos ante caídas generalizadas del soberano.'
            },
            {
                symbol: 'BBAR.BA', name: 'BBVA Argentina', tvSymbol: 'BCBA:BBAR',
                sector: 'Finanzas y Fintech', riskLevel: 'alto',
                logo: 'https://logo.clearbit.com/bbva.com.ar',
                newsQuery: 'BBVA Argentina BBAR OR Banco Frances',
                description: 'Filial argentina del grupo global BBVA, uno de los tres bancos privados más grandes del país.',
                planDeNegocios: 'Crecimiento en banca corporativa digital y financiación de consumo, con eficiencias basadas en la plataforma tecnológica global del grupo.',
                fundamentosClave: ['Margen financiero neto.','ROE, ROA y morosidad NPL.','Crecimiento de depósitos minoristas.'],
                analisisProfesional: 'Similar a Galicia y Macro, BBVA se beneficiaría de un ciclo de reactivación de préstamos privados productivos y minoristas en Argentina.'
            },
            {
                symbol: 'CEPU.BA', name: 'Central Puerto', tvSymbol: 'BCBA:CEPU',
                sector: 'Energía y Commodities', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/centralpuerto.com',
                newsQuery: 'Central Puerto CEPU argentina',
                description: 'Líder en generación de energía eléctrica en Argentina con activos térmicos, hidroeléctricos y eólicos.',
                planDeNegocios: 'Diversificación del portafolio sumando generación renovable y termoeléctrica eficiente, con expansión en agronegocios y forestería como cobertura macroeconómica.',
                fundamentosClave: ['Disponibilidad operativa de plantas (> 90%).','Generación neta en GWh.','Cobros en dólares bajo contratos de energía plus.','Flujo de caja de la división de agronegocios y forestería.'],
                analisisProfesional: 'Central Puerto actúa como activo cuasi-bono defensivo: una parte sustancial de su facturación está contractualmente dolarizada. Refugio de valor en momentos de caída del crudo.'
            },
            {
                symbol: 'ALUA.BA', name: 'Aluar', tvSymbol: 'BCBA:ALUA',
                sector: 'Energía y Commodities', riskLevel: 'alto',
                logo: 'https://logo.clearbit.com/aluar.com.ar',
                newsQuery: 'Aluar ALUA argentina',
                description: 'Único productor primario de aluminio en Argentina, con planta de clase mundial en Puerto Madryn.',
                planDeNegocios: 'Orientación exportadora (75-80% de la producción). Optimización del costo energético mediante parque eólico propio y venta de aluminio de valor agregado.',
                fundamentosClave: ['Precio del aluminio en la Bolsa de Metales de Londres (LME).','Costo de la energía eléctrica industrial.','Tipo de cambio oficial.','Demanda del sector automotriz y construcción regional.'],
                analisisProfesional: 'Aluar es un exportador puro y un excelente vehículo de cobertura cambiaria local. Si el aluminio internacional sube, sus ingresos crecen de forma directa e inmediata.'
            },
            {
                symbol: 'TXAR.BA', name: 'Ternium Argentina', tvSymbol: 'BCBA:TXAR',
                sector: 'Energía y Commodities', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/ternium.com',
                newsQuery: 'Ternium TXAR argentina',
                description: 'Mayor fabricante de aceros planos en Argentina, controlada por el Grupo Techint.',
                planDeNegocios: 'Abastecimiento de chapa de acero para los sectores automotriz, electrodomésticos, agro y construcción. Participación en proyectos estratégicos de infraestructura.',
                fundamentosClave: ['Volumen de despachos de acero plano (toneladas).','Costo del mineral de hierro y carbón de coque.','Dividendo percibido de Ternium México.','Nivel de actividad de la construcción y sector automotriz local.'],
                analisisProfesional: 'Ternium se destaca por su sólida caja neta y tenencias en México. Ante un escenario recesivo local, la rentabilidad de su filial mexicana suele amortiguar el balance.'
            },
            {
                symbol: 'CRES.BA', name: 'Cresud', tvSymbol: 'BCBA:CRES',
                sector: 'Consumo y Otros', riskLevel: 'alto',
                logo: 'https://logo.clearbit.com/cresud.com.ar',
                newsQuery: 'Cresud CRES argentina OR "agro soja"',
                description: 'Compañía agropecuaria líder que gestiona tierras agrícolas en Argentina y la región, y controla el holding inmobiliario IRSA.',
                planDeNegocios: 'Adquisición, desarrollo y revalorización de tierras en Argentina, Brasil, Paraguay y Bolivia. Venta estratégica de campos optimizados y gestión de IRSA.',
                fundamentosClave: ['Precios internacionales de granos (Soja, Maíz, Trigo).','Hectáreas sembradas y bajo manejo activo.','Valor de mercado de la tenencia accionaria en IRSA.','Márgenes del negocio ganadero y pool de siembra.'],
                analisisProfesional: 'Cresud es un activo híbrido: exposición directa al ciclo de commodities agrícolas (soja) y al ciclo de recuperación inmobiliaria local (IRSA).'
            },
            {
                symbol: 'LOMA.BA', name: 'Loma Negra', tvSymbol: 'BCBA:LOMA',
                sector: 'Consumo y Otros', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/lomanegra.com.ar',
                newsQuery: 'Loma Negra LOMA cemento',
                description: 'El principal fabricante de cemento portland en Argentina con más del 40% de participación de mercado.',
                planDeNegocios: 'Producción y distribución de cemento, hormigón y agregados para infraestructura pública, minería y edificación privada.',
                fundamentosClave: ['Despachos de cemento en toneladas a nivel nacional.','Costo del gas y la electricidad industrial.','Margen EBITDA de producción de cemento.'],
                analisisProfesional: 'Loma Negra es un termómetro de la actividad económica y la construcción en Argentina. Monitorear los despachos de cemento de la cámara sectorial (AFCP).'
            }
        ]
    },
    {
        name: 'Internacional',
        companies: [
            {
                symbol: 'SPCX', name: 'SpaceX', tvSymbol: 'NASDAQ:SPCX',
                sector: 'Tecnología y Crecimiento', riskLevel: 'muy_alto',
                logo: 'https://logo.clearbit.com/spacex.com',
                newsQuery: 'SpaceX OR "SPCX" OR "Starlink" OR "Elon Musk space"',
                description: 'Corporación aeroespacial y de telecomunicaciones fundada por Elon Musk, dueña de Starlink. Cotiza en NASDAQ desde su IPO en junio de 2026.',
                planDeNegocios: 'Desarrollo del sistema Starship para transporte interplanetario y misiones a Luna/Marte. Expansión comercial y monetización de Starlink.',
                fundamentosClave: ['Lanzamientos de Falcon 9 y vuelos de Starship.','Satélites Starlink operativos en órbita baja.','Ingresos y margen neto de la división Starlink.','Contratos de defensa y misiones gubernamentales (NASA).'],
                analisisProfesional: 'Tras su IPO en junio de 2026 bajo el ticker SPCX, es uno de los activos de mayor crecimiento del sector espacial. Volatilidad extrema típica de empresas en etapa de desarrollo tecnológico.'
            },
            {
                symbol: 'TSM', name: 'TSMC', tvSymbol: 'NYSE:TSM',
                sector: 'Tecnología y Crecimiento', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/tsmc.com',
                newsQuery: 'TSMC OR "Taiwan Semiconductor" OR TSM',
                description: 'La mayor fundición de semiconductores independiente del mundo: fabrica los chips de Apple, NVIDIA y AMD.',
                planDeNegocios: 'Fabricación de microchips avanzados para clientes líderes globales. Expansión de plantas internacionales en EE.UU., Japón y Alemania.',
                fundamentosClave: ['Margen bruto operativo (históricamente > 53%).','Tasa de utilización de capacidad instalada.','Capex en litografía avanzada.','Demanda de servidores de Inteligencia Artificial.'],
                analisisProfesional: 'TSMC es un monopolio tecnológico en la fabricación de procesadores lógicos avanzados y el eslabón crítico de la revolución de la IA. Riesgo principal: tensión geopolítica China-Taiwán.'
            },
            {
                symbol: 'META', name: 'Meta Platforms', tvSymbol: 'NASDAQ:META',
                sector: 'Tecnología y Crecimiento', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/meta.com',
                newsQuery: 'Meta Platforms OR "META" OR Zuckerberg',
                description: 'Matriz de Facebook, Instagram y WhatsApp. Más de 3.000 millones de usuarios activos monetizados principalmente con publicidad digital.',
                planDeNegocios: 'Monetizar la atención de usuarios mediante anuncios altamente personalizados e integración de asistentes de IA generativa (Llama) para maximizar la permanencia.',
                fundamentosClave: ['Usuarios Activos Diarios (DAU) en toda la suite.','Ingreso Promedio por Usuario (ARPU) publicitario.','Capex asignado a centros de datos y GPUs de IA.','Flujo de caja operativo y recompra de acciones.'],
                analisisProfesional: 'Meta es una máquina de generación de efectivo gracias a efectos de red insuperables. La optimización por IA ha recuperado los márgenes operativos con creces.'
            },
            {
                symbol: 'NU', name: 'Nubank', tvSymbol: 'NYSE:NU',
                sector: 'Finanzas y Fintech', riskLevel: 'alto',
                logo: 'https://logo.clearbit.com/nu.com.br',
                newsQuery: 'Nubank OR "NU bank" fintech',
                description: 'El banco digital más grande fuera de Asia, con más de 100 millones de clientes en Brasil, México y Colombia.',
                planDeNegocios: 'Escalar la base de clientes activos superando los 100 millones y expandir operaciones en México y Colombia.',
                fundamentosClave: ['Ingreso Promedio por Usuario Activo (ARPU).','Costo Unitario de Servicio (Cost to Serve) y Costo de Adquisición (CAC).','ROE de la operación madura en Brasil (> 25%).','Ratio de morosidad a 90 días (NPL).','Tasa de actividad de clientes.'],
                analisisProfesional: 'Nubank opera con márgenes espectaculares por ser puramente digital. Su gran riesgo es el ciclo de crédito en México y Colombia en fases de desaceleración económica.'
            },
            {
                symbol: 'MELI', name: 'Mercado Libre', tvSymbol: 'NASDAQ:MELI',
                sector: 'Tecnología y Crecimiento', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/mercadolibre.com',
                newsQuery: 'Mercado Libre MELI ecommerce',
                description: 'Gigante latinoamericano de e-commerce y servicios financieros digitales a través de Mercado Pago.',
                planDeNegocios: 'Consolidación del ecosistema integrado e-commerce/fintech y expansión de la red logística propia para entregas en el mismo día.',
                fundamentosClave: ['Volumen Bruto de Mercadería (GMV).','Volumen Total de Pagos Procesados (TPV).','Margen Operativo y EBITDA consolidado.','Calidad crediticia de Mercado Crédito.','Crecimiento en Brasil y México.'],
                analisisProfesional: 'Mercado Libre combina la escala logística de Amazon con la red de pagos de PayPal en América Latina. Transatlántico de crecimiento regional.'
            },
            {
                symbol: 'AAPL', name: 'Apple', tvSymbol: 'NASDAQ:AAPL',
                sector: 'Tecnología y Crecimiento', riskLevel: 'bajo',
                logo: 'https://logo.clearbit.com/apple.com',
                newsQuery: 'Apple AAPL iphone',
                description: 'Líder tecnológico global creador del iPhone, iPad y un ecosistema cerrado de software y servicios recurrentes de alto margen.',
                planDeNegocios: 'Monetización de más de 2.000 millones de dispositivos activos. Transición hacia empresa de servicios de alto margen e integración de inteligencia artificial híbrida (Apple Intelligence).',
                fundamentosClave: ['Ventas de iPhone y tasas de renovación.','Crecimiento y margen bruto de Servicios (> 70%).','Flujo de caja libre y recompra de acciones.','Evolución del mercado en China continental.'],
                analisisProfesional: 'Apple funciona como refugio de valor tecnológico por su masiva acumulación de efectivo. Ante subas de tasas de la Fed, suele sostenerse mejor que otras Big Tech.'
            },
            {
                symbol: 'MSFT', name: 'Microsoft', tvSymbol: 'NASDAQ:MSFT',
                sector: 'Tecnología y Crecimiento', riskLevel: 'bajo',
                logo: 'https://logo.clearbit.com/microsoft.com',
                newsQuery: 'Microsoft MSFT ai Azure',
                description: 'Pionero de software empresarial e infraestructura en la nube con Azure, colíder global en Inteligencia Artificial.',
                planDeNegocios: 'Liderar la IA comercial integrando Copilot en Office, Windows e infraestructura Azure. Contratos multianuales con empresas de todo el mundo.',
                fundamentosClave: ['Crecimiento de ingresos de Azure y la nube.','Margen operativo de Intelligent Cloud.','Adopción corporativa de licencias Copilot.','Flujo de caja libre trimestral.'],
                analisisProfesional: 'Microsoft es el estándar de oro corporativo. Su base de contratos multianuales la hace extremadamente defensiva en recesiones.'
            },
            {
                symbol: 'NVDA', name: 'NVIDIA', tvSymbol: 'NASDAQ:NVDA',
                sector: 'Tecnología y Crecimiento', riskLevel: 'muy_alto',
                logo: 'https://logo.clearbit.com/nvidia.com',
                newsQuery: 'Nvidia NVDA GPU ai',
                description: 'Diseñador líder de GPUs e infraestructura de supercomputación para inteligencia artificial. Proveedor de infraestructura clave de toda la revolución de IA.',
                planDeNegocios: 'Proveer el hardware (GPUs Blackwell/Hopper) fundamental para la IA generativa. Mantener el foso tecnológico a través del ecosistema de software CUDA.',
                fundamentosClave: ['Ingresos de la división de Centros de Datos.','Margen bruto operativo (> 70%).','Ciclo de entrega de chips de nueva arquitectura.','Demanda de Capex de hiperescaladores (Microsoft, Meta, Google, Amazon).'],
                analisisProfesional: 'NVIDIA es el activo más volátil del sector tecnológico moderno. Si la inversión global en infraestructura de IA muestra signos de saturación, experimenta correcciones profundas.'
            },
            {
                symbol: 'TSLA', name: 'Tesla', tvSymbol: 'NASDAQ:TSLA',
                sector: 'Tecnología y Crecimiento', riskLevel: 'muy_alto',
                logo: 'https://logo.clearbit.com/tesla.com',
                newsQuery: 'Tesla TSLA electric vehicle',
                description: 'Líder en vehículos eléctricos, almacenamiento de energía en baterías, robótica y conducción autónoma.',
                planDeNegocios: 'Transición de fabricante automotriz a empresa de software de conducción autónoma (FSD), robotaxis y robótica humanoide (Optimus).',
                fundamentosClave: ['Margen operativo automotriz (excluyendo créditos regulatorios).','Vehículos producidos y entregados por trimestre.','Adopción de la suscripción de software FSD.','Crecimiento de almacenamiento de energía (Megapacks).'],
                analisisProfesional: 'Tesla cotiza como empresa de tecnología disruptiva/IA, lo que justifica sus múltiplos elevados. Es muy propensa a la volatilidad de narrativa.'
            },
            {
                symbol: 'AMZN', name: 'Amazon', tvSymbol: 'NASDAQ:AMZN',
                sector: 'Tecnología y Crecimiento', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/amazon.com',
                newsQuery: 'Amazon OR AMZN OR AWS',
                description: 'Gigante mundial de e-commerce, computación en la nube (AWS) y publicidad digital.',
                planDeNegocios: 'Consolidación logística e incremento de velocidad de despacho. Crecimiento en AWS con integración de agentes de IA.',
                fundamentosClave: ['Crecimiento de la facturación en AWS.','Márgenes de flujo libre de caja consolidados.','Ingresos de la división publicitaria integrada.'],
                analisisProfesional: 'AWS opera como el gran subsidio de rentabilidad para el retail. En ciclos restrictivos de gasto IT, la rentabilidad general de Amazon se desacelera.'
            },
            {
                symbol: 'GOOGL', name: 'Alphabet', tvSymbol: 'NASDAQ:GOOGL',
                sector: 'Tecnología y Crecimiento', riskLevel: 'bajo',
                logo: 'https://logo.clearbit.com/google.com',
                newsQuery: 'Google OR Alphabet OR GOOGL',
                description: 'Matriz de Google Search, YouTube, Android y Google Cloud. Pionera de modelos multimodales de IA (Gemini).',
                planDeNegocios: 'Defensa del negocio de anuncios en Search mediante IA generativa nativa, crecimiento de YouTube y expansión de Google Cloud.',
                fundamentosClave: ['Ingresos de Google Search y YouTube.','Margen operativo y contratos en Google Cloud.','Flujo de caja libre y programas de dividendos o recompras.'],
                analisisProfesional: 'Google cuenta con una valuación más económica que Microsoft o Apple, actuando como opción Big Tech defensiva con alto potencial en IA generativa (Gemini).'
            },
            {
                symbol: 'NFLX', name: 'Netflix', tvSymbol: 'NASDAQ:NFLX',
                sector: 'Tecnología y Crecimiento', riskLevel: 'medio',
                logo: 'https://logo.clearbit.com/netflix.com',
                newsQuery: 'Netflix OR NFLX',
                description: 'Plataforma líder global de entretenimiento en streaming con más de 270 millones de suscriptores.',
                planDeNegocios: 'Monetización mediante planes con anuncios, control de cuentas compartidas y desarrollo de contenido local de alta viralización.',
                fundamentosClave: ['Adiciones netas de suscriptores pagos trimestrales.','Ingreso promedio por usuario (ARM).','Márgenes operativos y flujo de caja libre generado.'],
                analisisProfesional: 'Netflix ha demostrado que puede generar flujos de caja reales consistentemente en el sector de streaming, a diferencia de sus competidores directos.'
            },
            {
                symbol: 'KO', name: 'Coca-Cola', tvSymbol: 'NYSE:KO',
                sector: 'Consumo y Otros', riskLevel: 'bajo',
                logo: 'https://logo.clearbit.com/cocacola.com',
                newsQuery: 'Coca Cola KO beverage',
                description: 'Compañía global de bebidas no alcohólicas: un estándar de inversión defensiva con dividendos crecientes por más de 60 años.',
                planDeNegocios: 'Venta de concentrados a embotelladores bajo modelo de franquicias de bajo capital. Diversificación hacia aguas, jugos, bebidas deportivas, tés y cafés.',
                fundamentosClave: ['Crecimiento de ingresos orgánicos y volumen de cajas.','Margen operativo de venta de concentrados (> 28%).','Historial de dividendos crecientes (> 60 años).','Evolución del tipo de cambio global.'],
                analisisProfesional: 'Coca-Cola es un activo netamente defensivo e inflacionario con fuerte poder de fijación de precios. Refugio de valor en contextos de incertidumbre macroeconómica.'
            }
        ]
    }
];

export const PRESETS = [
    {
        id: 'beginner',
        name: 'Quiero empezar (Sólida & Diversificada)',
        icon: 'leaf',
        description: 'Activos de alta capitalización, márgenes comprobados y bajo riesgo relativo. Ideal para iniciar.',
        holdings: [
            { symbol: 'AAPL', weight: 40 },
            { symbol: 'KO', weight: 30 },
            { symbol: 'MELI', weight: 30 },
        ],
        highlight: true,
    },
    {
        id: 'energia_arg',
        name: 'Energía Argentina & Vaca Muerta',
        icon: 'flame',
        description: 'Enfoque en desarrollo no convencional, transporte de gas y generación eléctrica estratégica.',
        holdings: [
            { symbol: 'YPFD.BA', weight: 35 },
            { symbol: 'VIST', weight: 30 },
            { symbol: 'PAMP.BA', weight: 20 },
            { symbol: 'TGSU2.BA', weight: 15 },
        ],
    },
    {
        id: 'tech_ia',
        name: 'Big Tech & Inteligencia Artificial',
        icon: 'cpu',
        description: 'Líderes de software empresarial, chips aceleradores y plataformas digitales globales.',
        holdings: [
            { symbol: 'MSFT', weight: 25 },
            { symbol: 'NVDA', weight: 25 },
            { symbol: 'AAPL', weight: 20 },
            { symbol: 'GOOGL', weight: 15 },
            { symbol: 'META', weight: 15 },
        ],
    },
    {
        id: 'finanzas_fintech',
        name: 'Finanzas & Disrupción Digital',
        icon: 'bank',
        description: 'Equilibrio entre bancos argentinos tradicionales y el mayor banco digital regional.',
        holdings: [
            { symbol: 'GGAL.BA', weight: 30 },
            { symbol: 'BMA.BA', weight: 25 },
            { symbol: 'NU', weight: 25 },
            { symbol: 'MELI', weight: 20 },
        ],
    },
    {
        id: 'dividendos_defensiva',
        name: 'Alto Dividendo & Defensiva',
        icon: 'target',
        description: 'Compañías con flujos de fondos predecibles y pago constante de dividendos.',
        holdings: [
            { symbol: 'KO', weight: 40 },
            { symbol: 'CEPU.BA', weight: 30 },
            { symbol: 'PAMP.BA', weight: 30 },
        ],
    }
];

CATEGORIES.forEach(cat => {
    cat.companies.forEach(comp => {
        comp.category = cat.name;
    });
});

export const getCompanyBySymbol = (symbol) => {
    if (!symbol) return null;
    for (const cat of CATEGORIES) {
        const found = cat.companies.find(c => c.symbol === symbol);
        if (found) return found;
    }
    return null;
};

export const hasSector = (portfolioHoldings, sectorName) => {
    if (!portfolioHoldings || portfolioHoldings.length === 0) return false;
    return portfolioHoldings.some(item => {
        const sym = typeof item === 'string' ? item : item.symbol;
        const comp = getCompanyBySymbol(sym);
        return comp && comp.sector === sectorName;
    });
};

/**
 * Normaliza cualquier formato de cartera a [{ symbol, weight }] donde sum(weight) === 100
 */
export const normalizeHoldings = (raw) => {
    if (!raw || !Array.isArray(raw) || raw.length === 0) return [];

    // Si es array de strings ['AAPL', 'MELI']
    if (typeof raw[0] === 'string') {
        const equalWeight = 100 / raw.length;
        return raw.map(symbol => ({
            symbol,
            weight: Number(equalWeight.toFixed(2)),
        }));
    }

    // Si es array de objetos [{ symbol, weight }]
    const totalWeight = raw.reduce((sum, item) => sum + (Number(item.weight) || 0), 0);
    if (totalWeight <= 0) {
        const equalWeight = 100 / raw.length;
        return raw.map(item => ({
            symbol: item.symbol,
            weight: Number(equalWeight.toFixed(2)),
        }));
    }

    return raw.map(item => ({
        symbol: item.symbol,
        weight: Number(((Number(item.weight) / totalWeight) * 100).toFixed(2)),
    }));
};

/**
 * Calcula todas las métricas de fundamentals consolidadas de la cartera
 */
export const calculatePortfolioMetrics = (holdings, fundamentalsMap = {}) => {
    const normalized = normalizeHoldings(holdings);
    if (normalized.length === 0) {
        return {
            weightedPE: null,
            weightedForwardPE: null,
            weightedPriceToBook: null,
            weightedEVToEbitda: null,
            weightedROE: null,
            weightedROA: null,
            weightedOperatingMargin: null,
            weightedProfitMargin: null,
            weightedDividendYield: null,
            weightedBeta: null,
            weightedUpside: null,
            sectorBreakdown: {},
            geoBreakdown: {},
            riskBreakdown: {},
            hhi: 0,
            healthScore: 50,
            diagnostics: [],
            upcomingEarnings: [],
        };
    }

    let totalWeightValidPE = 0;
    let sumWeightedInvPE = 0;

    let totalWeightForwardPE = 0;
    let sumForwardPE = 0;

    let totalWeightPB = 0;
    let sumPB = 0;

    let totalWeightEV = 0;
    let sumEV = 0;

    let totalWeightROE = 0;
    let sumROE = 0;

    let totalWeightROA = 0;
    let sumROA = 0;

    let totalWeightOpMargin = 0;
    let sumOpMargin = 0;

    let totalWeightProfitMargin = 0;
    let sumProfitMargin = 0;

    let totalWeightDivYield = 0;
    let sumDivYield = 0;

    let totalWeightBeta = 0;
    let sumBeta = 0;

    let totalWeightUpside = 0;
    let sumUpside = 0;

    const sectorWeights = {};
    const geoWeights = {};
    const riskWeights = { bajo: 0, medio: 0, alto: 0, muy_alto: 0 };
    let hhi = 0;
    const upcomingEarnings = [];

    normalized.forEach(item => {
        const sym = item.symbol;
        const w = (Number(item.weight) || 0) / 100;
        const comp = getCompanyBySymbol(sym);
        const data = fundamentalsMap[sym] || {};

        const pct = w * 100;
        hhi += pct * pct;

        if (comp) {
            sectorWeights[comp.sector] = (sectorWeights[comp.sector] || 0) + pct;
            geoWeights[comp.category] = (geoWeights[comp.category] || 0) + pct;
            const r = comp.riskLevel || 'medio';
            riskWeights[r] = (riskWeights[r] || 0) + pct;
        }

        if (data.pe && data.pe > 0 && data.pe < 250) {
            sumWeightedInvPE += w / data.pe;
            totalWeightValidPE += w;
        }

        if (data.forwardPe && data.forwardPe > 0 && data.forwardPe < 250) {
            sumForwardPE += w * data.forwardPe;
            totalWeightForwardPE += w;
        }

        if (data.priceToBook && data.priceToBook > 0 && data.priceToBook < 100) {
            sumPB += w * data.priceToBook;
            totalWeightPB += w;
        }

        if (data.evToEbitda && data.evToEbitda > 0 && data.evToEbitda < 100) {
            sumEV += w * data.evToEbitda;
            totalWeightEV += w;
        }

        if (data.roe !== null && data.roe !== undefined && !isNaN(data.roe)) {
            sumROE += w * data.roe;
            totalWeightROE += w;
        }

        if (data.roa !== null && data.roa !== undefined && !isNaN(data.roa)) {
            sumROA += w * data.roa;
            totalWeightROA += w;
        }

        if (data.operatingMargin !== null && data.operatingMargin !== undefined && !isNaN(data.operatingMargin)) {
            sumOpMargin += w * data.operatingMargin;
            totalWeightOpMargin += w;
        }

        if (data.profitMargin !== null && data.profitMargin !== undefined && !isNaN(data.profitMargin)) {
            sumProfitMargin += w * data.profitMargin;
            totalWeightProfitMargin += w;
        }

        if (data.dividendYield !== null && data.dividendYield !== undefined && !isNaN(data.dividendYield)) {
            sumDivYield += w * data.dividendYield;
            totalWeightDivYield += w;
        }

        if (data.beta !== null && data.beta !== undefined && !isNaN(data.beta)) {
            sumBeta += w * data.beta;
            totalWeightBeta += w;
        }

        if (data.upsidePotential !== null && data.upsidePotential !== undefined && !isNaN(data.upsidePotential)) {
            sumUpside += w * data.upsidePotential;
            totalWeightUpside += w;
        }

        if (data.nextEarningsDate) {
            upcomingEarnings.push({
                symbol: sym,
                name: comp?.name || sym,
                date: data.nextEarningsDate,
            });
        }
    });

    upcomingEarnings.sort((a, b) => new Date(a.date) - new Date(b.date));

    const weightedPE = totalWeightValidPE > 0.2 ? totalWeightValidPE / sumWeightedInvPE : null;
    const weightedForwardPE = totalWeightForwardPE > 0.2 ? sumForwardPE / totalWeightForwardPE : null;
    const weightedPriceToBook = totalWeightPB > 0.2 ? sumPB / totalWeightPB : null;
    const weightedEVToEbitda = totalWeightEV > 0.2 ? sumEV / totalWeightEV : null;
    const weightedROE = totalWeightROE > 0.2 ? sumROE / totalWeightROE : null;
    const weightedROA = totalWeightROA > 0.2 ? sumROA / totalWeightROA : null;
    const weightedOperatingMargin = totalWeightOpMargin > 0.2 ? sumOpMargin / totalWeightOpMargin : null;
    const weightedProfitMargin = totalWeightProfitMargin > 0.2 ? sumProfitMargin / totalWeightProfitMargin : null;
    const weightedDividendYield = totalWeightDivYield > 0.2 ? sumDivYield / totalWeightDivYield : 0;
    const weightedBeta = totalWeightBeta > 0.2 ? sumBeta / totalWeightBeta : 1.0;
    const weightedUpside = totalWeightUpside > 0.2 ? sumUpside / totalWeightUpside : null;

    const diagnostics = [];

    if (weightedROE !== null) {
        if (weightedROE >= 20) {
            diagnostics.push({
                type: 'positive',
                title: 'Excelente Rentabilidad sobre Patrimonio (ROE)',
                desc: `El ROE ponderado de la cartera es del ${weightedROE.toFixed(1)}%, reflejando alta eficiencia en la generación de ganancias sobre el capital accionario.`,
            });
        } else if (weightedROE < 10) {
            diagnostics.push({
                type: 'warning',
                title: 'Rentabilidad Moderada/Baja',
                desc: `El ROE ponderado es del ${weightedROE.toFixed(1)}%. Podrías considerar ponderar empresas con mayores márgenes y ventajas competitivas.`,
            });
        }
    }

    if (weightedPE !== null) {
        if (weightedPE < 15) {
            diagnostics.push({
                type: 'positive',
                title: 'Valuación Atractiva (Estilo Value)',
                desc: `El múltiplo P/E promedio de la cartera se ubica en ${weightedPE.toFixed(1)}x, ofreciendo un margen de seguridad interesante frente a los promedios globales.`,
            });
        } else if (weightedPE > 35) {
            diagnostics.push({
                type: 'warning',
                title: 'Valuación Exigente (Estilo Growth)',
                desc: `Con un P/E ponderado de ${weightedPE.toFixed(1)}x, la cartera descuenta un crecimiento futuro acelerado, lo que puede incrementar la volatilidad ante reportes trimestrales.`,
            });
        }
    }

    const topSector = Object.entries(sectorWeights).sort((a, b) => b[1] - a[1])[0];
    if (topSector && topSector[1] > 50) {
        diagnostics.push({
            type: 'warning',
            title: `Concentración Sectorial en ${topSector[0]} (${topSector[1].toFixed(0)}%)`,
            desc: `Más de la mitad de la cartera depende de un solo sector. Te sugerimos diversificar en otros rubros para mitigar riesgos sectoriales.`,
        });
    } else if (normalized.length >= 4 && hhi < 2500) {
        diagnostics.push({
            type: 'positive',
            title: 'Buena Diversificación de Activos',
            desc: 'La distribución de activos y sectores equilibra apropiadamente el riesgo no sistemático de cada empresa.',
        });
    }

    if (weightedUpside !== null && weightedUpside > 12) {
        diagnostics.push({
            type: 'positive',
            title: 'Potencial de Revalorización Positivo',
            desc: `El consenso de analistas de Wall Street proyecta un potencial de suba promedio ponderado del +${weightedUpside.toFixed(1)}% para tus tenencias.`,
        });
    }

    let healthScore = 60;
    if (weightedROE && weightedROE > 18) healthScore += 12;
    if (weightedOperatingMargin && weightedOperatingMargin > 15) healthScore += 10;
    if (weightedPE && weightedPE < 25) healthScore += 8;
    if (hhi < 2500) healthScore += 10;
    if (topSector && topSector[1] > 55) healthScore -= 12;
    if (normalized.length === 1) healthScore -= 20;
    healthScore = Math.max(15, Math.min(98, healthScore));

    return {
        weightedPE,
        weightedForwardPE,
        weightedPriceToBook,
        weightedEVToEbitda,
        weightedROE,
        weightedROA,
        weightedOperatingMargin,
        weightedProfitMargin,
        weightedDividendYield,
        weightedBeta,
        weightedUpside,
        sectorBreakdown: sectorWeights,
        geoBreakdown: geoWeights,
        riskBreakdown: riskWeights,
        hhi,
        healthScore,
        diagnostics,
        upcomingEarnings,
    };
};
