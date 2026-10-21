/**
 * Centralized Analytics & Google Tag Manager (GTM) DataLayer Dispatcher
 * Portfolio Container ID: GTM-NSWWZMST
 */

// Safely push to window.dataLayer
export const pushToDataLayer = (payload) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  const eventPayload = {
    ...payload,
    timestamp: Date.now(),
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  };

  window.dataLayer.push(eventPayload);

  // Debug logging in dev environment for fast verification in browser console
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(
      `%c[GTM DataLayer] %c${payload.event || 'custom_event'}`,
      'background: #00F0FF; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 2px;',
      'color: #00F0FF; font-weight: bold;',
      eventPayload
    );
  }
};

/**
 * Generic event tracker
 */
export const trackEvent = (eventName, params = {}) => {
  pushToDataLayer({
    event: eventName,
    ...params,
  });
};

/**
 * Page View Tracking (SPA routes & initial entry)
 */
export const trackPageView = (pageTitle = document.title) => {
  pushToDataLayer({
    event: 'page_view',
    page_title: pageTitle,
    page_location: window.location.href,
  });
};

/**
 * Section In-View / Scroll Impression
 */
export const trackSectionView = (sectionId, sectionName, direction = 'down') => {
  pushToDataLayer({
    event: 'section_view',
    section_id: sectionId,
    section_name: sectionName,
    entry_direction: direction,
  });
};

/**
 * Section Dwell Time (How long user read a section)
 */
export const trackSectionDwell = (sectionId, dwellSeconds) => {
  if (dwellSeconds < 1) return;
  pushToDataLayer({
    event: 'section_dwell',
    section_id: sectionId,
    dwell_time_seconds: Math.round(dwellSeconds),
  });
};

/**
 * Scroll Depth Milestones (25%, 50%, 75%, 90%, 100%)
 */
export const trackScrollDepth = (percent) => {
  pushToDataLayer({
    event: 'scroll_depth',
    percent_scrolled: percent,
  });
};

/**
 * Resume Download Tracking
 */
export const trackResumeDownload = (sourceLocation = 'navbar', fileName = 'Yadav_Amarjit_Resume.pdf') => {
  pushToDataLayer({
    event: 'resume_download',
    source_location: sourceLocation,
    file_name: fileName,
    file_category: 'document',
  });
};

/**
 * Contact Modal Interactions
 */
export const trackContactModalOpen = (triggerSource = 'navbar') => {
  pushToDataLayer({
    event: 'contact_modal_open',
    trigger_source: triggerSource,
  });
};

export const trackContactModalClose = (closeMethod = 'close_button') => {
  pushToDataLayer({
    event: 'contact_modal_close',
    close_method: closeMethod,
  });
};

export const trackContactFormFocus = (fieldName) => {
  pushToDataLayer({
    event: 'contact_form_focus',
    field_focused: fieldName,
  });
};

export const trackContactFormSubmit = (status = 'success', errorType = null) => {
  pushToDataLayer({
    event: 'contact_form_submit',
    status,
    error_type: errorType,
  });
};

/**
 * Copy to Clipboard Events
 */
export const trackCopyAction = (contentType = 'email', copiedValue = '') => {
  pushToDataLayer({
    event: 'contact_copy_action',
    content_type: contentType,
    copied_value: copiedValue,
  });
};

/**
 * Outbound Link & Social Profile Tracking
 */
export const trackOutboundClick = (destinationUrl, platform = 'external_link') => {
  pushToDataLayer({
    event: 'outbound_click',
    platform,
    outbound_url: destinationUrl,
  });
};

export const trackSocialClick = (platform, url) => {
  pushToDataLayer({
    event: 'social_profile_click',
    social_network: platform,
    outbound_url: url,
  });
};

/**
 * Systems Bento & Projects Exploration
 */
export const trackSystemSelect = (systemId, systemTitle, source = 'bento_card') => {
  pushToDataLayer({
    event: 'system_card_select',
    system_id: systemId,
    system_title: systemTitle,
    interaction_source: source,
  });
};

export const trackSystemModalClose = (systemId) => {
  pushToDataLayer({
    event: 'system_modal_close',
    system_id: systemId,
  });
};

/**
 * Hero Node Graph Canvas Interactions
 */
export const trackNodeGraphClick = (nodeId, nodeLabel = '') => {
  pushToDataLayer({
    event: 'node_graph_click',
    node_id: nodeId,
    node_label: nodeLabel,
  });
};

export const trackHeroCTA = (ctaLabel, targetAction) => {
  pushToDataLayer({
    event: 'hero_cta_click',
    cta_label: ctaLabel,
    target_action: targetAction,
  });
};

/**
 * Elevator HUD Precision Caliper Navigation
 */
export const trackElevatorJump = (targetSection, floorNumber) => {
  pushToDataLayer({
    event: 'elevator_hud_jump',
    target_section: targetSection,
    floor_number: floorNumber,
  });
};

/**
 * Navigation Bar Link Clicks
 */
export const trackNavClick = (linkName, destinationId) => {
  pushToDataLayer({
    event: 'nav_link_click',
    link_name: linkName,
    destination_id: destinationId,
  });
};

/**
 * Experience Timeline Tab Switching
 */
export const trackExperienceTab = (company, role) => {
  pushToDataLayer({
    event: 'experience_tab_switch',
    company,
    role,
  });
};

/**
 * Telemetry & Certificates Lightbox
 */
export const trackCertificateModal = (certTitle, issuer) => {
  pushToDataLayer({
    event: 'certificate_modal_open',
    certificate_title: certTitle,
    issuer,
  });
};

/**
 * Technical Stack & Tool Hover/Inspection
 */
export const trackTechHover = (toolName, category = '') => {
  pushToDataLayer({
    event: 'tech_tool_hover',
    tool_name: toolName,
    category,
  });
};
