import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocaleProvider } from '@/lib/i18n';
import {
  SovereignMicroservicesTopology,
  MvpRoadmapGantt,
  SaudiSovereignMap,
  TOPOLOGY_STAGES,
  GANTT_SPRINTS,
  SAUDI_REGIONS,
} from '@/components/schematics';

const renderEn = (ui: React.ReactElement) => {
  return render(<LocaleProvider initialLocale="en">{ui}</LocaleProvider>);
};

const renderAr = (ui: React.ReactElement) => {
  return render(<LocaleProvider initialLocale="ar">{ui}</LocaleProvider>);
};

describe('Milestone M_DIAGRAMS: Technical Schematics & Architecture Diagrams', () => {
  describe('1. SovereignMicroservicesTopology', () => {
    it('renders the 4-stage pipeline with all expected technical nodes in English', () => {
      renderEn(<SovereignMicroservicesTopology />);

      expect(screen.getByTestId('sovereign-microservices-topology')).toBeInTheDocument();
      expect(screen.getByText(/SOVEREIGN MICROSERVICES TOPOLOGY/i)).toBeInTheDocument();

      // Check all 4 stage technologies
      expect(screen.getAllByText(/Kong \/ Envoy Mesh/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Apache Kafka Enterprise/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Docker \/ Kubernetes Pods/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/PostgreSQL \/ MinIO \/ S3/i).length).toBeGreaterThan(0);
    });

    it('renders localized titles and labels in Arabic mode', () => {
      renderAr(<SovereignMicroservicesTopology />);

      expect(screen.getByText(/طوبولوجيا الخدمات المصغرة السيادية/i)).toBeInTheDocument();
      expect(screen.getAllByText(/بوابة واجهات البرمجة \(Kong \/ Envoy\)/i).length).toBeGreaterThan(0);
    });

    it('defaults to Gateway stage and displays live telemetry metrics and manifest', () => {
      renderEn(<SovereignMicroservicesTopology defaultActiveNode="gateway" />);

      expect(screen.getByTestId('topology-active-stage-tag')).toHaveTextContent('STAGE 01 ACTIVE');
      expect(screen.getByText('1.2ms')).toBeInTheDocument();
      expect(screen.getByText('124k req/s')).toBeInTheDocument();
      expect(screen.getByText(/sovereign-mtls-auth/i)).toBeInTheDocument();
    });

    it('allows interactive node selection and updates the active telemetry inspector', () => {
      renderEn(<SovereignMicroservicesTopology />);

      // Switch to Event Broker (Kafka)
      const brokerNode = screen.getByTestId('topology-node-broker');
      fireEvent.click(brokerNode);

      expect(screen.getByTestId('topology-active-stage-tag')).toHaveTextContent('STAGE 02 ACTIVE');
      expect(screen.getByText('850 MB/s')).toBeInTheDocument();
      expect(screen.getByText(/enterprise\.telemetry\.events/i)).toBeInTheDocument();

      // Switch to Isolated Worker Pods
      const workersNode = screen.getByTestId('topology-node-workers');
      fireEvent.click(workersNode);

      expect(screen.getByTestId('topology-active-stage-tag')).toHaveTextContent('STAGE 03 ACTIVE');
      expect(screen.getByText('32 Autoscaled')).toBeInTheDocument();
      expect(screen.getByText(/gvisor-runsc/i)).toBeInTheDocument();

      // Switch to Sovereign Data Lake
      const datalakeNode = screen.getByTestId('topology-node-datalake');
      fireEvent.click(datalakeNode);

      expect(screen.getByTestId('topology-active-stage-tag')).toHaveTextContent('STAGE 04 ACTIVE');
      expect(screen.getByText('45,000 IOPS')).toBeInTheDocument();
      expect(screen.getByText('SA-Riyadh-AZ1')).toBeInTheDocument();
    });

    it('toggles code snippet visibility based on showCodeSnippet prop', () => {
      const { rerender } = renderEn(<SovereignMicroservicesTopology showCodeSnippet={false} />);
      expect(screen.queryByText(/apiVersion:/i)).not.toBeInTheDocument();

      rerender(
        <LocaleProvider initialLocale="en">
          <SovereignMicroservicesTopology showCodeSnippet={true} />
        </LocaleProvider>
      );
      expect(screen.getByText(/apiVersion:/i)).toBeInTheDocument();
    });
  });

  describe('2. MvpRoadmapGantt', () => {
    it('renders the 8-week timeline and 4 milestone diamond checkpoints', () => {
      renderEn(<MvpRoadmapGantt />);

      expect(screen.getByTestId('mvp-roadmap-gantt')).toBeInTheDocument();
      expect(screen.getByText(/8-WEEK RAPID MVP GANTT ROADMAP/i)).toBeInTheDocument();

      // Verify all 8 week indicators
      for (let w = 1; w <= 8; w++) {
        expect(screen.getByTestId(`gantt-week-header-${w}`)).toBeInTheDocument();
      }

      // Verify all 4 milestone diamond markers
      expect(screen.getByTestId('gantt-milestone-M1')).toBeInTheDocument();
      expect(screen.getByTestId('gantt-milestone-M2')).toBeInTheDocument();
      expect(screen.getByTestId('gantt-milestone-M3')).toBeInTheDocument();
      expect(screen.getByTestId('gantt-milestone-M4')).toBeInTheDocument();
    });

    it('displays initial Phase 1 deliverables and updates when switching phases', () => {
      renderEn(<MvpRoadmapGantt initialSelectedPhase={1} />);

      expect(screen.getByTestId('gantt-active-phase-tag')).toHaveTextContent('PHASE 01 // W1 - W2');
      expect(screen.getByText(/System Architecture ADRs & C4 Container Model/i)).toBeInTheDocument();

      // Click Phase 2
      const phase2Bar = screen.getByTestId('gantt-bar-phase-2');
      fireEvent.click(phase2Bar);

      expect(screen.getByTestId('gantt-active-phase-tag')).toHaveTextContent('PHASE 02 // W3 - W4');
      expect(screen.getByText(/Regional Payment Rails \(mada & Apple Pay\)/i)).toBeInTheDocument();

      // Click Phase 3
      const phase3Bar = screen.getByTestId('gantt-bar-phase-3');
      fireEvent.click(phase3Bar);

      expect(screen.getByTestId('gantt-active-phase-tag')).toHaveTextContent('PHASE 03 // W5 - W6');
      expect(screen.getByText(/Sovereign RAG Vector Pipeline & Tool Agents/i)).toBeInTheDocument();

      // Click Phase 4
      const phase4Bar = screen.getByTestId('gantt-bar-phase-4');
      fireEvent.click(phase4Bar);

      expect(screen.getByTestId('gantt-active-phase-tag')).toHaveTextContent('PHASE 04 // W7 - W8');
      expect(screen.getByText(/NCA ECC & Saudi PDPL Class 3 Verification/i)).toBeInTheDocument();
      expect(screen.getByText(/Complete Git Repository & 100% Source IP Transfer/i)).toBeInTheDocument();
    });

    it('renders localized deliverables in Arabic mode', () => {
      renderAr(<MvpRoadmapGantt initialSelectedPhase={1} />);

      expect(screen.getByText(/مخطط غانت لإطلاق النموذج الأولي \(8 أسابيع\)/i)).toBeInTheDocument();
      expect(screen.getByText(/سجلات القرارات المعمارية ونموذج الحاويات C4/i)).toBeInTheDocument();
    });

    it('displays 100% IP handover guarantee and zero vendor lock-in badges', () => {
      renderEn(<MvpRoadmapGantt />);

      expect(screen.getAllByText(/ZERO VENDOR LOCK-IN/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/56-DAY HANDOVER GUARANTEED/i)).toBeInTheDocument();
      expect(screen.getByText(/100% COMPLETE SOURCE CODE & IP OWNERSHIP TRANSFER/i)).toBeInTheDocument();
    });
  });

  describe('3. SaudiSovereignMap', () => {
    it('renders vector map with header HUD badges and 4 latency nodes in English', () => {
      renderEn(<SaudiSovereignMap />);

      expect(screen.getByTestId('saudi-sovereign-map')).toBeInTheDocument();
      expect(screen.getByText(/SOVEREIGN TOPOLOGY \/\/ IN-KINGDOM NODES/i)).toBeInTheDocument();
      expect(screen.getByText(/PDPL CLASS 3 VERIFIED/i)).toBeInTheDocument();
      expect(screen.getByText(/NCA ECC COMPLIANT/i)).toBeInTheDocument();
      expect(screen.getByText(/AVG LATENCY: 4.87MS/i)).toBeInTheDocument();

      // Check all 4 region pins in SVG
      expect(screen.getByTestId('saudi-map-pin-riyadh')).toBeInTheDocument();
      expect(screen.getByTestId('saudi-map-pin-jeddah')).toBeInTheDocument();
      expect(screen.getByTestId('saudi-map-pin-neom')).toBeInTheDocument();
      expect(screen.getByTestId('saudi-map-pin-dammam')).toBeInTheDocument();
    });

    it('renders Arabic HUD and node descriptions in Arabic mode', () => {
      renderAr(<SaudiSovereignMap />);

      expect(screen.getByText(/طوبولوجيا البنية التحتية السيادية في المملكة/i)).toBeInTheDocument();
      expect(screen.getByText(/الرياض \(مركز البيانات السحابي الرئيسي\)/i)).toBeInTheDocument();
    });

    it('defaults to Riyadh node and allows interactive switching across all 4 zones', () => {
      const handleRegionChange = vi.fn();
      renderEn(<SaudiSovereignMap initialRegionId="riyadh" onRegionChange={handleRegionChange} />);

      // Verify Riyadh active telemetry
      expect(screen.getByTestId('saudi-active-region-tag')).toHaveTextContent('riyadh // CENTRAL CORE');
      expect(screen.getAllByText('3.8ms').length).toBeGreaterThan(0);
      expect(screen.getByText(/Tier-IV Redundant Core/i)).toBeInTheDocument();
      expect(screen.getByText(/100% In-Kingdom \(Zero Egress\)/i)).toBeInTheDocument();

      // Click Neom
      const neomBtn = screen.getByTestId('saudi-region-btn-neom');
      fireEvent.click(neomBtn);

      expect(handleRegionChange).toHaveBeenCalledWith('neom');
      expect(screen.getByTestId('saudi-active-region-tag')).toHaveTextContent('neom // AI GPU SWARM');
      expect(screen.getAllByText('5.1ms').length).toBeGreaterThan(0);
      expect(screen.getByText(/GPU Accelerated Core \(H100\/B200 Swarm\)/i)).toBeInTheDocument();
      expect(screen.getByText(/800Gbps InfiniBand Quantum-2/i)).toBeInTheDocument();

      // Click Jeddah
      const jeddahBtn = screen.getByTestId('saudi-region-btn-jeddah');
      fireEvent.click(jeddahBtn);

      expect(handleRegionChange).toHaveBeenCalledWith('jeddah');
      expect(screen.getByTestId('saudi-active-region-tag')).toHaveTextContent('jeddah // SUBSEA GATEWAY');
      expect(screen.getAllByText('6.4ms').length).toBeGreaterThan(0);

      // Click Dammam
      const dammamBtn = screen.getByTestId('saudi-region-btn-dammam');
      fireEvent.click(dammamBtn);

      expect(handleRegionChange).toHaveBeenCalledWith('dammam');
      expect(screen.getByTestId('saudi-active-region-tag')).toHaveTextContent('dammam // INDUSTRIAL SCADA');
      expect(screen.getAllByText('4.2ms').length).toBeGreaterThan(0);
    });
  });

  describe('4. Barrel Exports & Interface Contracts', () => {
    it('exports all 3 components and data catalogs correctly', () => {
      expect(SovereignMicroservicesTopology).toBeDefined();
      expect(MvpRoadmapGantt).toBeDefined();
      expect(SaudiSovereignMap).toBeDefined();

      expect(TOPOLOGY_STAGES).toHaveLength(4);
      expect(GANTT_SPRINTS).toHaveLength(4);
      expect(SAUDI_REGIONS).toHaveLength(4);
    });
  });
});
