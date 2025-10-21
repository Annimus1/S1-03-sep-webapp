// tests/unit/credit.model.test.js

import mongoose from 'mongoose';
import CreditModel from '../../src/models/credit.model.js';
import UserModel from '../../src/models/user.model.js';

// --------------------------------------------------------------------------
// CONFIGURACIÓN DE MONGOOSE
// --------------------------------------------------------------------------
const LONG_TIMEOUT = 10000;

beforeAll(async () => {
  const uri = process.env.MONGO_TEST_URI;
  if (!uri) {
    throw new Error("MONGO_TEST_URI no está definido en .env");
  }
  await mongoose.connect(uri);
}, LONG_TIMEOUT);

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await CreditModel.deleteMany({});
  await UserModel.deleteMany({});
});

// --------------------------------------------------------------------------
// TEST DE CREACIÓN DE CRÉDITO DE INVERSIÓN
// --------------------------------------------------------------------------
describe('Modelo Credit -> Crédito de Inversión / Expansión', () => {

  it('debería crear correctamente un crédito de inversión con subesquema completo', async () => {
    // Crear usuario simulado
    const user = await UserModel.create({
      email: 'inversion@test.com',
      password: 'pass123',
      nombres: 'Juan',
      apellidos: 'Inversor',
      personalDNI: '12345678',
      empresarialCUIT: '30712345678',
      Cargo: 'CEO',
      CUIT: '30712345678',
      nombreComercial: 'Inversion Corp',
      tipoSocietario: 'SA',
      domicilioFiscal: 'Calle Falsa 123',
      domicilioComercial: 'Calle Comercial 456',
      actividadEconomicaPrincipal: '6499',
      fechaConstitucion: new Date(),
      numeroRegistro: 'ABCINV001',
      role: 'user',
      pep: false,
      certificadoPyME: '2500034A',
      Documentacion: ['test'],
    });

    const creditData = {
      userId: user._id,
      creditType: 'inversion',
      ddjjImpositivas: 'link8',
      detalleCuentas: 'link9',
      comprobanteImpuestos: 'link10',
      ingresosEgresosMensuales: 'link11',
      proyeccionFlujoFondos: 'link12',
      registroVentasCompras: 'link13',
      planFinancieroCredito: 'link14',
      descripcionNegocio: 'link15',
      principalesClientes: 'link16',
      principalesProveedores: 'link17',
      comprobanteFacturacion: 'link18',
      constanciaCBU: 'link19',
      certificadoLibreDeuda: 'link20',
      historialPrestamos: 'link21',
      referenciasComerciales: 'link22',
      informeCrediticio: 'link23',
      detalleCreditos: 'link24',
      referenciasBancarias: 'link25',
      ddjjQuiebra: 'link26',
      tituloPropiedad: 'link27',
      tasaOficial: 'link28',
      avalSolidario: 'link29',
      comprobanteGarantes: 'link30',
      cesionSGR: 'link31',
      informeRegistral: 'link32',
      seguro: 'link33',
      declaracionPatrimonialGarante: 'link34',
      documentoDeuda: 'link35',
      ddjjOrigenLicito: 'link36',
      ddjjBeneficiarioFinal: 'link37',
      consentimientoAnalisis: 'link38',
      constanciaPoliticasInternas: 'link39',
      firmaDigital: 'link40',
      investmentCredit: {
        presupuestoInversion: 'linkA',
        cotizacionProveedores: 'linkB',
        estudioFactibilidad: 'linkC',
        planMantenimiento: 'linkD',
        informeTecnico: 'linkE',
        planImplementacion: 'linkF',
        permisosObra: 'linkG',
        facturaProforma: 'linkH',
      }
    };

    const credit = await CreditModel.create(creditData);

    expect(credit._id).toBeDefined();
    expect(credit.creditType).toBe('inversion');
    expect(credit.investmentCredit.planImplementacion).toBe('linkF');
    expect(credit.workingCapitalCredit).toBeNull();
  }, LONG_TIMEOUT);
});

// --------------------------------------------------------------------------
// TEST DE CREACIÓN DE CRÉDITO DE CAPITAL DE TRABAJO
// --------------------------------------------------------------------------
describe('Modelo Credit -> Crédito de Capital de Trabajo', () => {

  it('debería crear correctamente un crédito de capital de trabajo con subesquema completo', async () => {
    const user = await UserModel.create({
      email: 'capital@test.com',
      password: 'pass123',
      nombres: 'Ana',
      apellidos: 'Capital',
      personalDNI: '99999999',
      empresarialCUIT: '30999999990',
      Cargo: 'Gerente',
      CUIT: '30999999990',
      nombreComercial: 'Capital Work SRL',
      tipoSocietario: 'SRL',
      domicilioFiscal: 'Dir Fiscal 123',
      domicilioComercial: 'Dir Comercial 456',
      actividadEconomicaPrincipal: '6499',
      fechaConstitucion: new Date(),
      numeroRegistro: 'ABCCAP001',
      role: 'user',
      pep: false,
      certificadoPyME: '2500034B',
      Documentacion: ['doc'],
    });

    const creditData = {
      userId: user._id,
      creditType: 'capital_trabajo',
      ddjjImpositivas: 'link8',
      detalleCuentas: 'link9',
      comprobanteImpuestos: 'link10',
      ingresosEgresosMensuales: 'link11',
      proyeccionFlujoFondos: 'link12',
      registroVentasCompras: 'link13',
      planFinancieroCredito: 'link14',
      descripcionNegocio: 'link15',
      principalesClientes: 'link16',
      principalesProveedores: 'link17',
      comprobanteFacturacion: 'link18',
      constanciaCBU: 'link19',
      certificadoLibreDeuda: 'link20',
      historialPrestamos: 'link21',
      referenciasComerciales: 'link22',
      informeCrediticio: 'link23',
      detalleCreditos: 'link24',
      referenciasBancarias: 'link25',
      ddjjQuiebra: 'link26',
      tituloPropiedad: 'link27',
      tasaOficial: 'link28',
      avalSolidario: 'link29',
      comprobanteGarantes: 'link30',
      cesionSGR: 'link31',
      informeRegistral: 'link32',
      seguro: 'link33',
      declaracionPatrimonialGarante: 'link34',
      documentoDeuda: 'link35',
      ddjjOrigenLicito: 'link36',
      ddjjBeneficiarioFinal: 'link37',
      consentimientoAnalisis: 'link38',
      constanciaPoliticasInternas: 'link39',
      firmaDigital: 'link40',
      workingCapitalCredit: {
        detalleFondos: 'fondos1',
        proyeccionFlujoOperativo: 'flujo2',
        gastosOperativos: 'gastos3',
        facturasProforma: 'fact4',
        evidenciaExpancion: 'exp5'
      }
    };

    const credit = await CreditModel.create(creditData);

    expect(credit._id).toBeDefined();
    expect(credit.creditType).toBe('capital_trabajo');
    expect(credit.workingCapitalCredit.detalleFondos).toBe('fondos1');
    expect(credit.investmentCredit).toBeNull();
  }, LONG_TIMEOUT);
});
