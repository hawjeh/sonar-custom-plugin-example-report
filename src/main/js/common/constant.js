export function getMetrics() {
  return "alert_status,quality_gate_details,bugs,new_bugs,reliability_rating,new_reliability_rating,vulnerabilities,new_vulnerabilities,security_rating,new_security_rating,security_hotspots,new_security_hotspots,security_hotspots_reviewed,new_security_hotspots_reviewed,security_review_rating,new_security_review_rating,code_smells,new_code_smells,sqale_rating,new_maintainability_rating,sqale_index,new_technical_debt,coverage,new_coverage,lines_to_cover,new_lines_to_cover,tests,duplicated_lines_density,new_duplicated_lines_density,duplicated_blocks,ncloc,ncloc_language_distribution,projects,lines,new_lines";
}

export function getSonarMetrics() {
  return "buffer-overflow,sql-injection,rce,object-injection,command-injection,path-traversal-injection,ldap-injection,xpath-injection,log-injection,xxe,xss,dos,ssrf,csrf,http-response-splitting,open-redirect,weak-cryptography,auth,insecure-conf,file-manipulation,others";
}

export function getCweMetrics() {
  return "787,79,125,20,78,89,416,22,352,434,306,190,502,287,476,798,119,862,276,200,522,732,611,918,77";
}

export function getOwasp2017Name() {
  return [
    "A1 - Injection",
    "A2 - Broken Authentication",
    "A3 - Sensitive Data Exposure",
    "A4 - XML External Entities (XXE)",
    "A5 - Broken Access Control",
    "A6 - Security Misconfiguration",
    "A7 - Cross-Site Scripting (XSS)",
    "A8 - Insecure Deserialization",
    "A9 - Using Components with Known Vulnerabilities",
    "A10 - Insufficient Logging & Monitoring"
  ];
}

export function getOwasp2021Name() {
  return [
    "A1 - Broken Access Control",
    "A2 - Cryptographic Failures",
    "A3 - Injection",
    "A4 - Insecure Design",
    "A5 - Security Misconfiguration",
    "A6 - Vulnerable and Outdated Components",
    "A7 - Identification and Authentication Failures",
    "A8 - Software and Data Integrity Failures",
    "A9 - Security Logging and Monitoring Failures",
    "A10 - Server-Side Request Forgery"
  ];
}

export function getSonarSourceName() {
  return [
    "Buffer Overflow",
    "SQL Injection",
    "Code Injection (RCE)",
    "Object Injection",
    "Command Injection",
    "Path Traversal Injection",
    "LDAP Injection",
    "XPath Injection",
    "Log Injection",
    "XML External Entity (XXE)",
    "Cross-Site Scripting (XSS)",
    "Denial of Service (DoS)",
    "Server-Side Request Forgery (SSRF)",
    "Cross-Site Request Forgery (CSRF)",
    "HTTP Response Splitting", "Open Redirect",
    "Weak Cryptography",
    "Authentication",
    "Insecure Configuration",
    "File Manipulation",
    "Others"];
}

export function getCweName() {
  return [
    "[1] CWE-787 - Out-of-bounds Write",
    "[2] CWE-79 - Cross-Site Scripting (XSS)",
    "[3] CWE-125 - Out-of-bounds Read",
    "[4] CWE-20 - Improper Input Validation",
    "[5] CWE-78 - OS Command Injection",
    "[6] CWE-89 - SQL Injection",
    "[7] CWE-416 - Use After Free",
    "[8] CWE-22 - Path Traversal",
    "[9] CWE-352 - Cross-Site Request Frogery (CSRF)",
    "[10] CWE-434 - Unrestricted Upload of File with Dangerous Type",
    "[11] CWE-306 - Missing Authentication for Critical Function",
    "[12] CWE-190 - Integer Overflow or Wraparound",
    "[13] CWE-502 - Deserialization of Untrusted Data",
    "[14] CWE-287 - Improper Authentication",
    "[15] CWE-476 - NULL Pointer Dereference",
    "[16] CWE-798 - Use of Hard-coded Credentials",
    "[17] CWE-119 - 	Improper Restriction of Operations within the Bounds of a Memory Buffer",
    "[18] CWE-862 - Missing Authorization",
    "[19] CWE-276 - Incorrect Default Permissions",
    "[20] CWE-200 - Exposure of Sensitive Information to an Unauthorized Actor",
    "[21] CWE-522 - Insufficiently Protected Credentials",
    "[22] CWE-732 - Incorrect Permission Assignment for Critical Resource",
    "[23] CWE-611 - Improper Restriction of XML External Entity Reference",
    "[24] CWE-918 - Sever-Side Request Forgery (SSRF)",
    "[25] CWE-77 - Command Injection"
  ];
}