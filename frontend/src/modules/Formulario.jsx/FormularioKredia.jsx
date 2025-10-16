import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// ============================================================================
// ATOMS - Componentes más básicos
// ============================================================================

const Logo = () => (
  <div className="logo-container">
    <div className="logo-icon">
      <div className="logo-triangle"></div>
    </div>
    <span className="logo-text">Kredia</span>
  </div>
);

const StepIndicator = ({ step, currentStep, label }) => {
  const isActive = step <= currentStep;
  const isCurrent = step === currentStep;
  
  return (
    <div className="step-indicator">
      <div className={`step-circle ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
        {step}
      </div>
      <div className="step-label">{label}</div>
    </div>
  );
};

const UploadButton = ({ label, placeholder, onChange, disabled }) => (
  <div className="upload-field">
    <Form.Control
      type="file"
      accept=".pdf"
      onChange={onChange}
      disabled={disabled}
      id={`file-${label}`}
      style={{ display: 'none' }}
    />
    <label htmlFor={`file-${label}`} className="upload-button-label">
      <span className="upload-placeholder">{placeholder}</span>
      <div className="upload-icon">↑</div>
    </label>
  </div>
);

const InfoIcon = ({ tooltip }) => (
  <span className="info-icon" title={tooltip}>?</span>
);

const RequiredAsterisk = () => <span className="required-asterisk">*</span>;

// ============================================================================
// MOLECULES - Combinaciones de átomos
// ============================================================================

const DocumentUploadField = ({ label, placeholder, required, info, onChange }) => (
  <div className="document-field">
    <div className="document-label">
      {label}
      {required && <RequiredAsterisk />}
      {info && <InfoIcon tooltip={info} />}
    </div>
    <UploadButton label={label} placeholder={placeholder} onChange={onChange} />
  </div>
);

const StepsProgress = ({ currentStep }) => {
  const steps = [
    { step: 1, label: 'Verificación de Identidad' },
    { step: 2, label: 'Información financiera' },
    { step: 3, label: 'Información operativa' },
    { step: 4, label: 'Propósito del crédito' },
    { step: 5, label: 'Validación Crediticia' },
    { step: 6, label: 'Firma digital' }
  ];

  return (
    <div className="steps-container">
      {steps.map(({ step, label }) => (
        <StepIndicator key={step} step={step} currentStep={currentStep} label={label} />
      ))}
    </div>
  );
};

const SaveButton = ({ onClick, saving }) => (
  <Button 
    variant="secondary" 
    className="save-button"
    onClick={onClick}
    disabled={saving}
  >
    {saving ? 'Guardando tu proceso...' : 'Guardar y Continuar después'}
  </Button>
);

// ============================================================================
// ORGANISMS - Componentes complejos compuestos de moléculas
// ============================================================================

const Step1Legal = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <p className="section-description">
        Sube los documentos requeridos para verificar tu cuenta y proceder con la solicitud de tu crédito
      </p>
      <h2 className="section-title">Documentación Legal</h2>
    </div>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Contrato o Estatuto Social completo y actualizado"
          placeholder="Emitido por IGJ o autoridad provincial"
          required
          onChange={(e) => setFormData({...formData, estatuto: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Acta de designación de autoridades vigentes"
          placeholder="Gerente, presidente, socio administrador"
          required
          onChange={(e) => setFormData({...formData, acta: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Poder del representante legal"
          placeholder="Si no figura en el estatuto"
          onChange={(e) => setFormData({...formData, poder: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Constancia de inscripción fiscal"
          placeholder="ARCA"
          required
          onChange={(e) => setFormData({...formData, arca: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Comprobante de domicilio fiscal"
          placeholder="Factura o constancia ARCA"
          required
          onChange={(e) => setFormData({...formData, domicilio: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Certificado MiPyME o equivalente"
          info="Certificado que acredita el tamaño de la empresa"
          onChange={(e) => setFormData({...formData, mipyme: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step2Representative = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <p className="section-description">
        Sube los documentos requeridos para verificar tu cuenta y proceder con la solicitud de tu crédito
      </p>
      <h2 className="section-title">Documentos del Representante Legal</h2>
    </div>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="DNI/Cédula de identidad/ Pasaporte"
          placeholder="Que coincida con el ID ya registrado"
          required
          onChange={(e) => setFormData({...formData, dni: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Comprobante de domicilio personal"
          placeholder="Servicio o impuesto a su nombre"
          required
          onChange={(e) => setFormData({...formData, domicilioPersonal: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Declaración jurada de beneficiario final"
          info="Formulario oficial requerido"
          onChange={(e) => setFormData({...formData, djBeneficiario: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Declaración jurada PEP"
          info="Persona Políticamente Expuesta"
          onChange={(e) => setFormData({...formData, djPep: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step3Financial1 = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <p className="section-description">
        Ayúdanos a conocer mejor la situación actual de tu empresa.
      </p>
      <h2 className="section-title">Información Financiera y Contable</h2>
    </div>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Estados contables auditados"
          placeholder="Últimos 2 o 3 ejercicios"
          info="Balance, Estado de Resultados, etc."
          onChange={(e) => setFormData({...formData, estadosAuditados: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Estados contables intermedios"
          placeholder="Último semestre"
          info="Información financiera actualizada"
          onChange={(e) => setFormData({...formData, estadosIntermedios: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Declaraciones juradas impositivas"
          placeholder="IVA, Ganancias, Ingresos Brutos"
          required
          onChange={(e) => setFormData({...formData, djImpositivas: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Comprobantes de pago de impuestos recientes"
          placeholder="Últimos 3 meses"
          required
          onChange={(e) => setFormData({...formData, pagoImpuestos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Resumen de cuentas bancarias"
          placeholder="Últimos 6- 12 meses"
          info="Extractos bancarios principales"
          onChange={(e) => setFormData({...formData, resumenBancario: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Detalle de ingresos y egresos mensuales"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, ingresoEgreso: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Detalle de cuentas por cobrar y pagar"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, cuentasCobrar: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Listado de inventarios actuales y valuaciones"
          placeholder=""
          info="Solo si aplica al negocio"
          onChange={(e) => setFormData({...formData, inventarios: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step4Financial2 = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <p className="section-description">
        Ayúdanos a conocer mejor la situación actual de tu empresa.
      </p>
      <h2 className="section-title">Información Financiera y Contable</h2>
    </div>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Detalle de activos fijos"
          placeholder="Maquinarias, inmuebles, vehículos, etc."
          info="Bienes de uso de la empresa"
          onChange={(e) => setFormData({...formData, activosFijos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Registro de ventas y compras"
          placeholder="Últimos 12 meses (Libro IVA Digital)"
          required
          onChange={(e) => setFormData({...formData, registroVentas: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Proyección de flujo de fondos"
          placeholder="Cash-flow proyectado 12-24 meses"
          required
          onChange={(e) => setFormData({...formData, flujoFondos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Ratios financieros"
          placeholder="Liquidez, endeudamiento, rentabilidad"
          info="Indicadores financieros clave"
          onChange={(e) => setFormData({...formData, ratios: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Certificación contable"
          placeholder="De no poseer pasivos ocultos"
          info="Certificado por contador público"
          onChange={(e) => setFormData({...formData, certificacion: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step5Operational1 = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <p className="section-description">
        Cuéntanos cómo opera tu empresa día a día. Esta información nos ayuda a entender mejor tu modelo de negocio.
      </p>
      <h2 className="section-title">Información Operativa y de Negocio</h2>
    </div>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Descripción general del negocio"
          placeholder="Actividad, tamaño, modelo de ingresos"
          required
          onChange={(e) => setFormData({...formData, descripcion: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Organigrama o estructura de personal clave"
          placeholder=""
          info="Estructura organizativa"
          onChange={(e) => setFormData({...formData, organigrama: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Principales clientes"
          placeholder="Nombre, tipo, % de ventas"
          required
          onChange={(e) => setFormData({...formData, clientes: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Principales proveedores"
          placeholder="Nombre, condiciones de pago"
          required
          onChange={(e) => setFormData({...formData, proveedores: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Contratos comerciales vigentes"
          placeholder="Alquiler, concesión, franquicia, etc."
          info="Acuerdos comerciales principales"
          onChange={(e) => setFormData({...formData, contratos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Comprobantes de facturación reciente"
          placeholder="Últimos 3 meses"
          required
          onChange={(e) => setFormData({...formData, facturacion: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step6Operational2 = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <p className="section-description">
        Cuéntanos cómo opera tu empresa día a día. Esta información nos ayuda a entender mejor tu modelo de negocio.
      </p>
      <h2 className="section-title">Información Operativa y de Negocio</h2>
    </div>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Certificados o permisos habilitantes"
          placeholder="Municipales, sanitarios, ambientales, etc."
          onChange={(e) => setFormData({...formData, certificados: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Comprobante de propiedad o contrato de alquiler del local"
          placeholder="Formato PDF"
          info="Documentación del lugar de operación"
          onChange={(e) => setFormData({...formData, propiedad: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Fotos del establecimiento, maquinaria o depósito"
          placeholder=""
          info="Evidencia visual de las operaciones"
          onChange={(e) => setFormData({...formData, fotos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Evidencia de actividad online"
          placeholder="Sitio web, redes, catálogos, etc."
          info="Presencia digital de la empresa"
          onChange={(e) => setFormData({...formData, actividadOnline: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Descripción del mercado y competencia"
          placeholder=""
          info="Análisis de mercado"
          onChange={(e) => setFormData({...formData, mercado: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step7CreditPurpose1 = ({ formData, setFormData, creditType, setCreditType }) => (
  <div className="form-section">
    <div className="section-header">
      <h2 className="section-title">Tipo de Crédito y Documentación Específica</h2>
    </div>

    <div className="credit-type-selector">
      <Button
        className={`credit-type-btn ${creditType === 'inversion' ? 'active' : ''}`}
        onClick={() => setCreditType('inversion')}
      >
        Crédito de Inversión/Expansión
      </Button>
      <span className="credit-type-divider">|</span>
      <Button
        className={`credit-type-btn ${creditType === 'trabajo' ? 'active' : ''}`}
        onClick={() => setCreditType('trabajo')}
      >
        Crédito Capital de Trabajo
      </Button>
    </div>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Presupuesto detallado de inversión"
          placeholder="Maquinaria, tecnología, obras, etc."
          info="Detalle del uso del crédito"
          onChange={(e) => setFormData({...formData, presupuestoInversion: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Tres cotizaciones de proveedores"
          placeholder="Si supera monto mínimo $5M"
          onChange={(e) => setFormData({...formData, cotizaciones: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Plan de implementación o cronograma de ejecución"
          placeholder="Si involucra obras o expansión"
          onChange={(e) => setFormData({...formData, planImplementacion: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Estudio de factibilidad o ROI"
          placeholder=""
          onChange={(e) => setFormData({...formData, estudioFactibilidad: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Licencias o permisos de obra"
          placeholder="Si hay construcción"
          onChange={(e) => setFormData({...formData, licencias: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Plan de mantenimiento del activo"
          placeholder="Si hay equipamiento"
          onChange={(e) => setFormData({...formData, planMantenimiento: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Factura proforma o contrato de compra"
          placeholder="Si hay adquisición"
          onChange={(e) => setFormData({...formData, facturaProforma: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Informe técnico del contador o ingeniero"
          placeholder=""
          onChange={(e) => setFormData({...formData, informeTecnico: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step8CreditPurpose2 = ({ formData, setFormData, creditType, setCreditType }) => (
  <div className="form-section">
    <div className="section-header">
      <h2 className="section-title">Tipo de Crédito y Documentación Específica</h2>
    </div>

    <div className="credit-type-selector">
      <Button
        className={`credit-type-btn ${creditType === 'inversion' ? 'active' : ''}`}
        onClick={() => setCreditType('inversion')}
      >
        Crédito de Inversión/Expansión
      </Button>
      <span className="credit-type-divider">|</span>
      <Button
        className={`credit-type-btn ${creditType === 'trabajo' ? 'active' : ''}`}
        onClick={() => setCreditType('trabajo')}
      >
        Crédito Capital de Trabajo
      </Button>
    </div>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Detalle del uso de fondos"
          placeholder=""
          onChange={(e) => setFormData({...formData, detalleUso: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Proyección de flujo operativo con y sin crédito"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, proyeccionFlujo: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Listado de gastos operativos fijos y variables"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, gastosOperativos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Facturas proforma o pedidos de compra"
          placeholder="Si no hay compras previstas"
          onChange={(e) => setFormData({...formData, pedidosCompra: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Evidencia de aumento de demanda o expansión"
          placeholder=""
          onChange={(e) => setFormData({...formData, evidenciaExpansion: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step9CreditValidation1 = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <h2 className="section-title">Información Crediticia, Garantías y Cumplimiento Regulatorio</h2>
    </div>

    <h3 className="subsection-title">Información Crediticia y Bancaria</h3>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Constancia de CBU o cuenta receptora"
          placeholder="Formato PDF (por ambos lados)"
          required
          onChange={(e) => setFormData({...formData, cbu: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Informe crediticio"
          placeholder="Formato PDF"
          required
          onChange={(e) => setFormData({...formData, informeCrediticio: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Certificado de libre deuda bancaria"
          placeholder=""
          onChange={(e) => setFormData({...formData, libreDeuda: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Detalle de créditos y líneas vigentes"
          placeholder="Si no posee deudas"
          onChange={(e) => setFormData({...formData, detalleCreditos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Historial de cumplimiento de préstamos anteriores"
          placeholder="Si no tuvo préstamos"
          onChange={(e) => setFormData({...formData, historialPrestamos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Referencias bancarias"
          placeholder="Mínimo 2 cuentas"
          onChange={(e) => setFormData({...formData, referenciasBancarias: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Referencias comerciales"
          placeholder="Proveedores o clientes"
          required
          onChange={(e) => setFormData({...formData, referenciasComerciales: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Declaración de no estar en concurso o quiebra"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, djConcurso: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step10CreditValidation2 = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <h2 className="section-title">Información Crediticia, Garantías y Cumplimiento Regulatorio</h2>
    </div>

    <h3 className="subsection-title">Garantías (Reales o Personales)</h3>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Título de propiedad del bien ofrecido"
          placeholder="Formato PDF (por ambos lados)"
          onChange={(e) => setFormData({...formData, tituloPropiedad: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Informe registral actualizado"
          placeholder="Formato PDF"
          onChange={(e) => setFormData({...formData, informeRegistral: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Tasación o valuación oficial del bien"
          placeholder=""
          onChange={(e) => setFormData({...formData, tasacion: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Seguro del bien"
          placeholder="Formato PDF"
          onChange={(e) => setFormData({...formData, seguroBien: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Aval solidario o fianza de socios"
          placeholder="Formato PDF"
          onChange={(e) => setFormData({...formData, avalSolidario: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Declaración patrimonial del garante"
          placeholder="Si hay garante"
          onChange={(e) => setFormData({...formData, djPatrimonial: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Comprobantes de ingresos del garante"
          placeholder="Si hay avalista"
          onChange={(e) => setFormData({...formData, ingresosGarante: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Pagaré o documento de deuda firmado"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, pagare: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Cesión de derechos de cobro o SGR"
          placeholder=""
          onChange={(e) => setFormData({...formData, cesionDerechos: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step11RegulatoryCompliance = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <h2 className="section-title">Información Crediticia, Garantías y Cumplimiento Regulatorio</h2>
    </div>

    <h3 className="subsection-title">Documentación Regulatoria</h3>

    <Row className="g-4">
      <Col md={6}>
        <DocumentUploadField
          label="Declaración jurada de origen lícito de fondos"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, djOrigenFondos: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Declaración de beneficiarios finales actualizada"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, djBeneficiariosFinales: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Declaración PEP actualizada"
          placeholder=""
          onChange={(e) => setFormData({...formData, djPepActualizada: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Constancia de políticas internas de cumplimiento"
          placeholder="Solo para sociedades grandes"
          onChange={(e) => setFormData({...formData, politicasCumplimiento: e.target.files[0]})}
        />
      </Col>
      <Col md={6}>
        <DocumentUploadField
          label="Consentimiento de análisis de información financiera"
          placeholder=""
          required
          onChange={(e) => setFormData({...formData, consentimientoAnalisis: e.target.files[0]})}
        />
      </Col>
    </Row>

    <div className="form-notes">
      <RequiredAsterisk /> Obligatorio
      <br />
      ! Formato PDF para todos los documentos
    </div>
  </div>
);

const Step12DigitalSignature = ({ formData, setFormData }) => (
  <div className="form-section">
    <div className="section-header">
      <h2 className="section-title">Firma Digital</h2>
      <p className="section-description">
        Último paso: revisa y firma digitalmente tu solicitud
      </p>
    </div>

    <div className="signature-container">
      <div className="signature-info">
        <p>Al firmar este documento, confirmas que:</p>
        <ul>
          <li>Toda la información proporcionada es verídica y completa</li>
          <li>Has leído y aceptas los términos y condiciones del crédito</li>
          <li>Autorizas a Kredia a verificar la información proporcionada</li>
          <li>Aceptas las políticas de privacidad y protección de datos</li>
        </ul>
      </div>

      <div className="signature-box">
        <div className="signature-placeholder">
          <p>Haz clic aquí para firmar digitalmente</p>
          <Button variant="primary" className="sign-button">
            Firmar Documento
          </Button>
        </div>
      </div>

      <Form.Group className="mt-4">
        <Form.Check 
          type="checkbox"
          id="terms-accept"
          label="He leído y acepto los Términos y Condiciones"
          onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
        />
      </Form.Group>
    </div>
  </div>
);

// ============================================================================
// TEMPLATES - Layouts y estructuras de página
// ============================================================================

const FormTemplate = ({ children, currentStep, onContinue, onSave, saving }) => (
  <div className="app-container">
    <header className="app-header">
      <Logo />
      <SaveButton onClick={onSave} saving={saving} />
    </header>

    <StepsProgress currentStep={currentStep} />

    <Container className="form-container">
      {children}
      
      <div className="form-actions">
        <Button 
          variant="primary" 
          className="continue-button"
          onClick={onContinue}
        >
          Continuar
        </Button>
      </div>
    </Container>

    <footer className="app-footer">
      Copyright @2025 Kredia <a href="#">Términos y Condiciones</a>
    </footer>
  </div>
);

// ============================================================================
// PAGES - Vistas completas de la aplicación
// ============================================================================

const FormularioKredia = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [creditType, setCreditType] = useState('inversion');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});

  const handleContinue = () => {
    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Progreso guardado exitosamente');
    }, 1500);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <Step1Legal formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2Representative formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3Financial1 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4Financial2 formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5Operational1 formData={formData} setFormData={setFormData} />;
      case 6:
        return <Step6Operational2 formData={formData} setFormData={setFormData} />;
      case 7:
        return <Step7CreditPurpose1 formData={formData} setFormData={setFormData} creditType={creditType} setCreditType={setCreditType} />;
      case 8:
        return <Step8CreditPurpose2 formData={formData} setFormData={setFormData} creditType={creditType} setCreditType={setCreditType} />;
      case 9:
        return <Step9CreditValidation1 formData={formData} setFormData={setFormData} />;
      case 10:
        return <Step10CreditValidation2 formData={formData} setFormData={setFormData} />;
      case 11:
        return <Step11RegulatoryCompliance formData={formData} setFormData={setFormData} />;
      case 12:
        return <Step12DigitalSignature formData={formData} setFormData={setFormData} />;
      default:
        return <Step1Legal formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <FormTemplate 
      currentStep={currentStep}
      onContinue={handleContinue}
      onSave={handleSave}
      saving={saving}
    >
      {renderStep()}
    </FormTemplate>
  );
};

export default FormularioKredia;