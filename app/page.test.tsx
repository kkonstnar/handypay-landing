/**
 * Property Tests for Landing Page SEO/AEO/CRO Optimization
 * Feature: landing-page-seo-aeo-cro-review
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Property 1: Single Static H1 with Keywords
 * 
 * For any render of the landing page, there SHALL be exactly one H1 element
 * that is static (hidden for SEO) and contains primary keyword phrases
 * related to payments.
 * 
 * **Validates: Requirements 1.1, 1.4, 2.3, 3.1**
 */
describe('Property 1: Single Static H1 with Keywords', () => {
  const pageSource = fs.readFileSync(
    path.join(process.cwd(), 'app/page.tsx'),
    'utf-8'
  )

  it('should have exactly one H1 element in the page source', () => {
    // Count H1 elements (both <h1> and motion.h1)
    const h1Matches = pageSource.match(/<h1|<motion\.h1/g) || []
    expect(h1Matches.length).toBe(1)
  })

  it('should have a static hidden H1 with sr-only class', () => {
    // Find the H1 element and verify it has sr-only class for screen readers
    const h1Pattern = /<h1[^>]*className="sr-only"[^>]*>([^<]+)<\/h1>/
    const h1Match = pageSource.match(h1Pattern)
    
    expect(h1Match).not.toBeNull()
    
    if (h1Match) {
      const h1Content = h1Match[1]
      // The H1 should have static text content with keywords
      expect(h1Content).toContain('Accept Card Payments')
      expect(h1Content).toContain('Jamaica')
    }
  })

  it('should contain primary keywords related to payments', () => {
    // Extract the H1 content
    const h1Pattern = /<h1[^>]*>([^<]+)<\/h1>/
    const h1Match = pageSource.match(h1Pattern)
    
    expect(h1Match).not.toBeNull()
    
    if (h1Match) {
      const h1Content = h1Match[1].toLowerCase()
      
      // Primary keywords that should be present (at least one)
      const primaryKeywords = [
        'card payments',
        'accept',
        'jamaica',
        'countries',
        'payment'
      ]
      
      const hasKeyword = primaryKeywords.some(keyword => 
        h1Content.includes(keyword.toLowerCase())
      )
      
      expect(hasKeyword).toBe(true)
    }
  })

  it('should have H1 with static content for all possible page states', () => {
    // Property-based test: For any arbitrary state index, the H1 should remain static
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }), // Arbitrary state index
        () => {
          // The H1 content should not depend on any state variable
          const h1Pattern = /<h1[^>]*>([^<]+)<\/h1>/
          const h1Match = pageSource.match(h1Pattern)
          
          if (!h1Match) return false
          
          const h1Content = h1Match[1]
          
          // H1 should NOT reference rotating content variables
          const hasRotatingContent = 
            h1Content.includes('rotatingTexts') ||
            h1Content.includes('currentTextIndex') ||
            h1Content.includes('{')
          
          return !hasRotatingContent
        }
      ),
      { numRuns: 100 }
    )
  })
})


/**
 * Property 2: Meta Tag Length Compliance
 * 
 * For any page metadata, the title tag SHALL be under 60 characters AND
 * the meta description SHALL be between 150-160 characters.
 * 
 * **Validates: Requirements 2.1, 2.2**
 */
describe('Property 2: Meta Tag Length Compliance', () => {
  const layoutSource = fs.readFileSync(
    path.join(process.cwd(), 'app/layout.tsx'),
    'utf-8'
  )

  it('should have title tag under 60 characters', () => {
    // Extract the default title from the metadata
    const titleMatch = layoutSource.match(/title:\s*\{[\s\S]*?default:\s*["']([^"']+)["']/)
    
    expect(titleMatch).not.toBeNull()
    
    if (titleMatch) {
      const title = titleMatch[1]
      expect(title.length).toBeLessThan(60)
    }
  })

  it('should have meta description between 150-160 characters', () => {
    // Extract the description from the metadata
    const descriptionMatch = layoutSource.match(/description:\s*["']([^"']+)["']/)
    
    expect(descriptionMatch).not.toBeNull()
    
    if (descriptionMatch) {
      const description = descriptionMatch[1]
      expect(description.length).toBeGreaterThanOrEqual(150)
      expect(description.length).toBeLessThanOrEqual(160)
    }
  })

  it('should maintain meta tag length compliance for any valid metadata configuration', () => {
    // Property-based test: For any arbitrary metadata configuration,
    // the title and description lengths should comply with SEO requirements
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }), // Arbitrary test iteration
        () => {
          // Extract title
          const titleMatch = layoutSource.match(/title:\s*\{[\s\S]*?default:\s*["']([^"']+)["']/)
          if (!titleMatch) return false
          const title = titleMatch[1]
          
          // Extract description
          const descriptionMatch = layoutSource.match(/description:\s*["']([^"']+)["']/)
          if (!descriptionMatch) return false
          const description = descriptionMatch[1]
          
          // Verify constraints
          const titleValid = title.length < 60
          const descriptionValid = description.length >= 150 && description.length <= 160
          
          return titleValid && descriptionValid
        }
      ),
      { numRuns: 100 }
    )
  })
})


/**
 * Property 3: Heading Hierarchy Integrity
 * 
 * For any sequence of heading elements (H1-H6) on the page, heading levels
 * SHALL NOT skip (e.g., no H1 → H3 without H2 in between).
 * 
 * **Validates: Requirements 2.4, 3.5**
 */
describe('Property 3: Heading Hierarchy Integrity', () => {
  const pageSource = fs.readFileSync(
    path.join(process.cwd(), 'app/page.tsx'),
    'utf-8'
  )
  
  const industriesSectionSource = fs.readFileSync(
    path.join(process.cwd(), 'components/industries-section.tsx'),
    'utf-8'
  )
  
  const demoSectionSource = fs.readFileSync(
    path.join(process.cwd(), 'components/demo-section.tsx'),
    'utf-8'
  )

  // Extract all heading elements with their levels from source code
  function extractHeadings(source: string): Array<{ level: number; content: string }> {
    const headings: Array<{ level: number; content: string }> = []
    
    // Match h1-h6 elements (both regular and motion variants)
    const headingPattern = /<(h[1-6]|motion\.h[1-6])[^>]*>([^<]*(?:<[^/][^>]*>[^<]*<\/[^>]+>)*[^<]*)<\/\1>/g
    let match
    
    while ((match = headingPattern.exec(source)) !== null) {
      const tagName = match[1].replace('motion.', '')
      const level = parseInt(tagName.charAt(1))
      const content = match[2].replace(/<[^>]+>/g, '').trim()
      headings.push({ level, content })
    }
    
    // Also match self-closing or simpler patterns
    const simplePattern = /<(h[1-6])[^>]*className="[^"]*"[^>]*>([^<]+)<\/\1>/g
    while ((match = simplePattern.exec(source)) !== null) {
      const level = parseInt(match[1].charAt(1))
      const content = match[2].trim()
      // Avoid duplicates
      if (!headings.some(h => h.content === content && h.level === level)) {
        headings.push({ level, content })
      }
    }
    
    return headings
  }

  // Check if heading hierarchy is valid (no skipped levels)
  function isValidHierarchy(headings: Array<{ level: number }>): boolean {
    if (headings.length === 0) return true
    
    // Track the highest level seen so far (lowest number = highest level)
    let highestLevelSeen = headings[0].level
    
    for (let i = 1; i < headings.length; i++) {
      const currentLevel = headings[i].level
      
      // If going to a lower level (higher number), check for skips
      if (currentLevel > highestLevelSeen + 1) {
        // Check if we've seen the intermediate level before
        const intermediateLevel = highestLevelSeen + 1
        const hasIntermediateLevel = headings.slice(0, i).some(h => h.level === intermediateLevel)
        
        if (!hasIntermediateLevel) {
          return false // Skipped a level
        }
      }
      
      // Update highest level seen if we're going deeper
      if (currentLevel > highestLevelSeen) {
        highestLevelSeen = currentLevel
      }
    }
    
    return true
  }

  it('should have exactly one H1 element', () => {
    const pageHeadings = extractHeadings(pageSource)
    const h1Count = pageHeadings.filter(h => h.level === 1).length
    
    // Count H1 elements directly from source
    const h1Matches = pageSource.match(/<h1[^>]*>/g) || []
    expect(h1Matches.length).toBe(1)
  })

  it('should have H2 elements for major sections', () => {
    // Count H2 elements directly from source (more reliable than regex extraction)
    const pageH2Matches = pageSource.match(/<h2[^>]*>/g) || []
    const industriesH2Matches = industriesSectionSource.match(/<h2[^>]*>/g) || []
    const demoH2Matches = demoSectionSource.match(/<h2[^>]*>/g) || []
    
    const totalH2Count = pageH2Matches.length + industriesH2Matches.length + demoH2Matches.length
    
    // Should have multiple H2s for different sections (Pricing, Global Reach, Testimonials, FAQ + Industries + Demo)
    expect(totalH2Count).toBeGreaterThanOrEqual(4)
  })

  it('should not skip heading levels in page.tsx', () => {
    // Check that we don't have H1 -> H3 without H2
    const hasH1 = pageSource.includes('<h1')
    const hasH2 = pageSource.includes('<h2')
    const hasH3 = pageSource.includes('<h3')
    
    // If we have H3, we must have H2
    if (hasH3) {
      expect(hasH2).toBe(true)
    }
    
    // If we have H2, we must have H1
    if (hasH2) {
      expect(hasH1).toBe(true)
    }
  })

  it('should not skip heading levels in industries-section.tsx', () => {
    const hasH2 = industriesSectionSource.includes('<h2')
    const hasH3 = industriesSectionSource.includes('<h3')
    const hasH4 = industriesSectionSource.includes('<h4')
    
    // If we have H3, we must have H2
    if (hasH3) {
      expect(hasH2).toBe(true)
    }
    
    // If we have H4, we must have H3
    if (hasH4) {
      expect(hasH3).toBe(true)
    }
  })

  it('should not skip heading levels in demo-section.tsx', () => {
    const hasH2 = demoSectionSource.includes('<h2')
    const hasH3 = demoSectionSource.includes('<h3')
    const hasH4 = demoSectionSource.includes('<h4')
    
    // If we have H3, we must have H2
    if (hasH3) {
      expect(hasH2).toBe(true)
    }
    
    // If we have H4, we must have H3
    if (hasH4) {
      expect(hasH3).toBe(true)
    }
  })

  it('should maintain heading hierarchy for any arbitrary section order', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }), // Arbitrary test iteration
        () => {
          // Verify the heading structure in each file
          const pageHasH1 = pageSource.includes('<h1')
          const pageHasH2 = pageSource.includes('<h2')
          const pageHasH3 = pageSource.includes('<h3')
          
          const industriesHasH2 = industriesSectionSource.includes('<h2')
          const industriesHasH3 = industriesSectionSource.includes('<h3')
          
          const demoHasH2 = demoSectionSource.includes('<h2')
          const demoHasH3 = demoSectionSource.includes('<h3')
          
          // Main page must have H1
          if (!pageHasH1) return false
          
          // If any file has H3, it must have H2
          if (pageHasH3 && !pageHasH2) return false
          if (industriesHasH3 && !industriesHasH2) return false
          if (demoHasH3 && !demoHasH2) return false
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should have proper heading order within each section', () => {
    // Verify that H2 comes before H3 in each component
    const industriesH2Index = industriesSectionSource.indexOf('<h2')
    const industriesH3Index = industriesSectionSource.indexOf('<h3')
    
    if (industriesH2Index !== -1 && industriesH3Index !== -1) {
      expect(industriesH2Index).toBeLessThan(industriesH3Index)
    }
    
    const demoH2Index = demoSectionSource.indexOf('<h2')
    const demoH3Index = demoSectionSource.indexOf('<h3')
    
    if (demoH2Index !== -1 && demoH3Index !== -1) {
      expect(demoH2Index).toBeLessThan(demoH3Index)
    }
  })
})


/**
 * Property 4: FAQ Schema-Content Consistency
 * 
 * For any FAQ question displayed on the page, there SHALL be a corresponding
 * entry in the FAQ schema markup with matching question text and answer text.
 * 
 * **Validates: Requirements 5.1**
 */
describe('Property 4: FAQ Schema-Content Consistency', () => {
  const pageSource = fs.readFileSync(
    path.join(process.cwd(), 'app/page.tsx'),
    'utf-8'
  )

  // Extract visible FAQ items from the page
  function extractVisibleFAQs(): Array<{ q: string; a: string }> {
    // Match the FAQ array in the map function
    const faqArrayPattern = /\[\s*\{[\s\S]*?q:\s*["']([^"']+)["'][\s\S]*?a:\s*["']([^"']+)["'][\s\S]*?\}[\s\S]*?\]\.map\(\(faq/g
    const faqs: Array<{ q: string; a: string }> = []
    
    // Find all FAQ items in the visible content
    const faqBlockMatch = pageSource.match(/\[\s*(\{[\s\S]*?\}[\s\S]*?)\]\.map\(\(faq, i\)/)
    if (faqBlockMatch) {
      const faqBlock = faqBlockMatch[1]
      const itemPattern = /\{\s*q:\s*["']([^"']+)["'],\s*a:\s*["']([^"']+)["']\s*\}/g
      let match
      while ((match = itemPattern.exec(faqBlock)) !== null) {
        faqs.push({ q: match[1], a: match[2] })
      }
    }
    
    return faqs
  }

  // Extract schema FAQ items
  function extractSchemaFAQs(): Array<{ name: string; text: string }> {
    const faqs: Array<{ name: string; text: string }> = []
    
    // Find the faqStructuredData object
    const schemaMatch = pageSource.match(/const faqStructuredData = \{[\s\S]*?"mainEntity":\s*\[([\s\S]*?)\]\s*\};/)
    if (schemaMatch) {
      const mainEntity = schemaMatch[1]
      const questionPattern = /"name":\s*"([^"]+)"[\s\S]*?"text":\s*"([^"]+)"/g
      let match
      while ((match = questionPattern.exec(mainEntity)) !== null) {
        faqs.push({ name: match[1], text: match[2] })
      }
    }
    
    return faqs
  }

  it('should have matching FAQ questions in schema and visible content', () => {
    const visibleFAQs = extractVisibleFAQs()
    const schemaFAQs = extractSchemaFAQs()
    
    // Each visible FAQ should have a matching schema entry
    visibleFAQs.forEach((visibleFaq) => {
      const matchingSchema = schemaFAQs.find(
        (schemaFaq) => schemaFaq.name === visibleFaq.q
      )
      expect(matchingSchema).toBeDefined()
    })
  })

  it('should have matching FAQ answers in schema and visible content', () => {
    const visibleFAQs = extractVisibleFAQs()
    const schemaFAQs = extractSchemaFAQs()
    
    // Each visible FAQ answer should match the schema answer
    visibleFAQs.forEach((visibleFaq) => {
      const matchingSchema = schemaFAQs.find(
        (schemaFaq) => schemaFaq.name === visibleFaq.q
      )
      if (matchingSchema) {
        expect(matchingSchema.text).toBe(visibleFaq.a)
      }
    })
  })

  it('should have equal number of FAQs in schema and visible content', () => {
    const visibleFAQs = extractVisibleFAQs()
    const schemaFAQs = extractSchemaFAQs()
    
    expect(schemaFAQs.length).toBe(visibleFAQs.length)
  })

  it('should maintain FAQ consistency for any arbitrary FAQ index', () => {
    const visibleFAQs = extractVisibleFAQs()
    const schemaFAQs = extractSchemaFAQs()
    
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: Math.max(visibleFAQs.length - 1, 0) }),
        (index) => {
          if (visibleFAQs.length === 0) return true
          
          const visibleFaq = visibleFAQs[index]
          const matchingSchema = schemaFAQs.find(
            (schemaFaq) => schemaFaq.name === visibleFaq.q
          )
          
          // Schema entry must exist and match
          return matchingSchema !== undefined && 
                 matchingSchema.text === visibleFaq.a
        }
      ),
      { numRuns: 100 }
    )
  })
})


/**
 * Property 5: Minimum FAQ Count
 * 
 * For any render of the landing page, the FAQ section SHALL contain
 * at least 5 FAQ items.
 * 
 * **Validates: Requirements 5.2**
 */
describe('Property 5: Minimum FAQ Count', () => {
  const pageSource = fs.readFileSync(
    path.join(process.cwd(), 'app/page.tsx'),
    'utf-8'
  )

  // Extract visible FAQ items from the page
  function extractVisibleFAQs(): Array<{ q: string; a: string }> {
    const faqs: Array<{ q: string; a: string }> = []
    
    // Find all FAQ items in the visible content
    const faqBlockMatch = pageSource.match(/\[\s*(\{[\s\S]*?\}[\s\S]*?)\]\.map\(\(faq, i\)/)
    if (faqBlockMatch) {
      const faqBlock = faqBlockMatch[1]
      const itemPattern = /\{\s*q:\s*["']([^"']+)["'],\s*a:\s*["']([^"']+)["']\s*\}/g
      let match
      while ((match = itemPattern.exec(faqBlock)) !== null) {
        faqs.push({ q: match[1], a: match[2] })
      }
    }
    
    return faqs
  }

  // Extract schema FAQ items
  function extractSchemaFAQs(): Array<{ name: string; text: string }> {
    const faqs: Array<{ name: string; text: string }> = []
    
    // Find the faqStructuredData object
    const schemaMatch = pageSource.match(/const faqStructuredData = \{[\s\S]*?"mainEntity":\s*\[([\s\S]*?)\]\s*\};/)
    if (schemaMatch) {
      const mainEntity = schemaMatch[1]
      const questionPattern = /"name":\s*"([^"]+)"[\s\S]*?"text":\s*"([^"]+)"/g
      let match
      while ((match = questionPattern.exec(mainEntity)) !== null) {
        faqs.push({ name: match[1], text: match[2] })
      }
    }
    
    return faqs
  }

  it('should have at least 5 visible FAQ items', () => {
    const visibleFAQs = extractVisibleFAQs()
    expect(visibleFAQs.length).toBeGreaterThanOrEqual(5)
  })

  it('should have at least 5 FAQ items in schema', () => {
    const schemaFAQs = extractSchemaFAQs()
    expect(schemaFAQs.length).toBeGreaterThanOrEqual(5)
  })

  it('should maintain minimum FAQ count for any page state', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }), // Arbitrary state
        () => {
          const visibleFAQs = extractVisibleFAQs()
          const schemaFAQs = extractSchemaFAQs()
          
          // Both visible and schema FAQs should have at least 5 items
          return visibleFAQs.length >= 5 && schemaFAQs.length >= 5
        }
      ),
      { numRuns: 100 }
    )
  })
})


/**
 * Property 10: Image Alt Text Completeness
 * 
 * For any image element on the landing page, there SHALL be an alt attribute
 * that is non-empty and not a generic placeholder (e.g., not "image", "photo", "picture").
 * 
 * **Validates: Requirements 10.4**
 */
describe('Property 10: Image Alt Text Completeness', () => {
  const pageSource = fs.readFileSync(
    path.join(process.cwd(), 'app/page.tsx'),
    'utf-8'
  )
  
  const industriesSectionSource = fs.readFileSync(
    path.join(process.cwd(), 'components/industries-section.tsx'),
    'utf-8'
  )
  
  const demoSectionSource = fs.readFileSync(
    path.join(process.cwd(), 'components/demo-section.tsx'),
    'utf-8'
  )

  // Generic alt text patterns that should NOT be used
  const genericAltPatterns = [
    /^image$/i,
    /^photo$/i,
    /^picture$/i,
    /^img$/i,
    /^hero image \d+$/i,
    /^image \d+$/i,
    /^placeholder$/i,
    /^alt$/i,
    /^""$/,
    /^''$/,
  ]

  function isGenericAlt(alt: string): boolean {
    if (!alt || alt.trim() === '') return true
    return genericAltPatterns.some(pattern => pattern.test(alt.trim()))
  }

  // Extract all alt attributes from Image components
  function extractAltTexts(source: string): string[] {
    const altTexts: string[] = []
    
    // Match alt attributes in Image components (both static and dynamic)
    // Pattern 1: alt="static text"
    const staticAltPattern = /alt=["']([^"']+)["']/g
    let match
    while ((match = staticAltPattern.exec(source)) !== null) {
      altTexts.push(match[1])
    }
    
    // Pattern 2: alt={variable.property} - extract the property name
    const dynamicAltPattern = /alt=\{([^}]+)\}/g
    while ((match = dynamicAltPattern.exec(source)) !== null) {
      // For dynamic alt text, we verify the variable exists and is used
      altTexts.push(match[1])
    }
    
    return altTexts
  }

  it('should have non-empty alt text for all images in page.tsx', () => {
    const altTexts = extractAltTexts(pageSource)
    
    // Filter out dynamic alt texts (they reference variables)
    const staticAltTexts = altTexts.filter(alt => !alt.includes('.'))
    
    staticAltTexts.forEach((alt) => {
      expect(alt.trim().length).toBeGreaterThan(0)
    })
  })

  it('should not use generic alt text in page.tsx', () => {
    const altTexts = extractAltTexts(pageSource)
    
    // Filter out dynamic alt texts (they reference variables)
    const staticAltTexts = altTexts.filter(alt => !alt.includes('.'))
    
    staticAltTexts.forEach((alt) => {
      expect(isGenericAlt(alt)).toBe(false)
    })
  })

  it('should have non-empty alt text for all images in industries-section.tsx', () => {
    const altTexts = extractAltTexts(industriesSectionSource)
    
    // Filter out dynamic alt texts (they reference variables)
    const staticAltTexts = altTexts.filter(alt => !alt.includes('.'))
    
    staticAltTexts.forEach((alt) => {
      expect(alt.trim().length).toBeGreaterThan(0)
    })
  })

  it('should have non-empty alt text for all images in demo-section.tsx', () => {
    const altTexts = extractAltTexts(demoSectionSource)
    
    // Filter out dynamic alt texts (they reference variables)
    const staticAltTexts = altTexts.filter(alt => !alt.includes('.'))
    
    staticAltTexts.forEach((alt) => {
      expect(alt.trim().length).toBeGreaterThan(0)
    })
  })

  it('should have descriptive alt text for hero images', () => {
    // Check that the rotatingImages array has descriptive alt text
    const rotatingImagesMatch = pageSource.match(/const rotatingImages = \[([\s\S]*?)\];/)
    
    expect(rotatingImagesMatch).not.toBeNull()
    
    if (rotatingImagesMatch) {
      const rotatingImagesContent = rotatingImagesMatch[1]
      
      // Should have alt properties with descriptive text
      const altMatches = rotatingImagesContent.match(/alt:\s*["']([^"']+)["']/g) || []
      
      expect(altMatches.length).toBeGreaterThan(0)
      
      altMatches.forEach((altMatch) => {
        const alt = altMatch.replace(/alt:\s*["']/, '').replace(/["']$/, '')
        expect(isGenericAlt(alt)).toBe(false)
        expect(alt.length).toBeGreaterThan(10) // Descriptive alt should be reasonably long
      })
    }
  })

  it('should have descriptive alt text for industry images', () => {
    // Check that the industries array has descriptive alt text
    const industriesMatch = industriesSectionSource.match(/const industries = \[([\s\S]*?)\];/)
    
    expect(industriesMatch).not.toBeNull()
    
    if (industriesMatch) {
      const industriesContent = industriesMatch[1]
      
      // Should have alt properties with descriptive text
      const altMatches = industriesContent.match(/alt:\s*["']([^"']+)["']/g) || []
      
      expect(altMatches.length).toBeGreaterThan(0)
      
      altMatches.forEach((altMatch) => {
        const alt = altMatch.replace(/alt:\s*["']/, '').replace(/["']$/, '')
        expect(isGenericAlt(alt)).toBe(false)
        expect(alt.length).toBeGreaterThan(10) // Descriptive alt should be reasonably long
      })
    }
  })

  it('should have descriptive alt text for demo poster images', () => {
    // Check that the demos array has descriptive posterAlt text
    const demosMatch = demoSectionSource.match(/const demos = \[([\s\S]*?)\]/)
    
    expect(demosMatch).not.toBeNull()
    
    if (demosMatch) {
      const demosContent = demosMatch[1]
      
      // Should have posterAlt properties with descriptive text
      const altMatches = demosContent.match(/posterAlt:\s*["']([^"']+)["']/g) || []
      
      expect(altMatches.length).toBeGreaterThan(0)
      
      altMatches.forEach((altMatch) => {
        const alt = altMatch.replace(/posterAlt:\s*["']/, '').replace(/["']$/, '')
        expect(isGenericAlt(alt)).toBe(false)
        expect(alt.length).toBeGreaterThan(10) // Descriptive alt should be reasonably long
      })
    }
  })

  it('should maintain alt text completeness for any arbitrary image index', () => {
    const pageAltTexts = extractAltTexts(pageSource).filter(alt => !alt.includes('.'))
    const industriesAltTexts = extractAltTexts(industriesSectionSource).filter(alt => !alt.includes('.'))
    const demoAltTexts = extractAltTexts(demoSectionSource).filter(alt => !alt.includes('.'))
    
    const allAltTexts = [...pageAltTexts, ...industriesAltTexts, ...demoAltTexts]
    
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: Math.max(allAltTexts.length - 1, 0) }),
        (index) => {
          if (allAltTexts.length === 0) return true
          
          const alt = allAltTexts[index]
          
          // Alt text should be non-empty and not generic
          return alt.trim().length > 0 && !isGenericAlt(alt)
        }
      ),
      { numRuns: 100 }
    )
  })
})


/**
 * Property 12: Essential Meta Tags Presence
 * 
 * For any render of the landing page, there SHALL be canonical URL,
 * Open Graph (og:title, og:description, og:image), and Twitter Card meta tags present.
 * 
 * **Validates: Requirements 10.1, 10.2**
 */
describe('Property 12: Essential Meta Tags Presence', () => {
  const layoutSource = fs.readFileSync(
    path.join(process.cwd(), 'app/layout.tsx'),
    'utf-8'
  )

  it('should have canonical URL defined', () => {
    // Check for canonical URL in alternates
    const canonicalMatch = layoutSource.match(/alternates:\s*\{[\s\S]*?canonical:\s*([^,\n]+)/)
    
    expect(canonicalMatch).not.toBeNull()
    
    if (canonicalMatch) {
      const canonicalValue = canonicalMatch[1].trim()
      // Should reference siteUrl or be a valid URL string
      expect(canonicalValue.length).toBeGreaterThan(0)
    }
  })

  it('should have Open Graph title defined', () => {
    // Check for og:title in openGraph object
    const ogTitleMatch = layoutSource.match(/openGraph:\s*\{[\s\S]*?title:\s*["']([^"']+)["']/)
    
    expect(ogTitleMatch).not.toBeNull()
    
    if (ogTitleMatch) {
      const ogTitle = ogTitleMatch[1]
      expect(ogTitle.length).toBeGreaterThan(0)
    }
  })

  it('should have Open Graph description defined', () => {
    // Check for og:description in openGraph object
    const ogDescMatch = layoutSource.match(/openGraph:\s*\{[\s\S]*?description:\s*["']([^"']+)["']/)
    
    expect(ogDescMatch).not.toBeNull()
    
    if (ogDescMatch) {
      const ogDesc = ogDescMatch[1]
      expect(ogDesc.length).toBeGreaterThan(0)
    }
  })

  it('should have Open Graph image defined', () => {
    // Check for og:image in openGraph object
    const ogImageMatch = layoutSource.match(/openGraph:\s*\{[\s\S]*?images:\s*\[/)
    
    expect(ogImageMatch).not.toBeNull()
    
    // Also verify the image has a URL
    const imageUrlMatch = layoutSource.match(/openGraph:\s*\{[\s\S]*?images:\s*\[[\s\S]*?url:\s*[`"']([^`"']+)[`"']/)
    expect(imageUrlMatch).not.toBeNull()
  })

  it('should have Open Graph type defined', () => {
    // Check for og:type in openGraph object
    const ogTypeMatch = layoutSource.match(/openGraph:\s*\{[\s\S]*?type:\s*["']([^"']+)["']/)
    
    expect(ogTypeMatch).not.toBeNull()
    
    if (ogTypeMatch) {
      const ogType = ogTypeMatch[1]
      expect(ogType).toBe('website')
    }
  })

  it('should have Twitter Card type defined', () => {
    // Check for twitter:card in twitter object
    const twitterCardMatch = layoutSource.match(/twitter:\s*\{[\s\S]*?card:\s*["']([^"']+)["']/)
    
    expect(twitterCardMatch).not.toBeNull()
    
    if (twitterCardMatch) {
      const cardType = twitterCardMatch[1]
      // Should be a valid Twitter card type
      expect(['summary', 'summary_large_image', 'app', 'player']).toContain(cardType)
    }
  })

  it('should have Twitter title defined', () => {
    // Check for twitter:title in twitter object
    const twitterTitleMatch = layoutSource.match(/twitter:\s*\{[\s\S]*?title:\s*["']([^"']+)["']/)
    
    expect(twitterTitleMatch).not.toBeNull()
    
    if (twitterTitleMatch) {
      const twitterTitle = twitterTitleMatch[1]
      expect(twitterTitle.length).toBeGreaterThan(0)
    }
  })

  it('should have Twitter description defined', () => {
    // Check for twitter:description in twitter object
    const twitterDescMatch = layoutSource.match(/twitter:\s*\{[\s\S]*?description:\s*["']([^"']+)["']/)
    
    expect(twitterDescMatch).not.toBeNull()
    
    if (twitterDescMatch) {
      const twitterDesc = twitterDescMatch[1]
      expect(twitterDesc.length).toBeGreaterThan(0)
    }
  })

  it('should have Twitter images defined', () => {
    // Check for twitter:images in twitter object
    const twitterImagesMatch = layoutSource.match(/twitter:\s*\{[\s\S]*?images:\s*\[/)
    
    expect(twitterImagesMatch).not.toBeNull()
  })

  it('should maintain essential meta tags presence for any page state', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }), // Arbitrary state
        () => {
          // Verify all essential meta tags are present
          const hasCanonical = layoutSource.includes('canonical:')
          const hasOgTitle = /openGraph:\s*\{[\s\S]*?title:/.test(layoutSource)
          const hasOgDesc = /openGraph:\s*\{[\s\S]*?description:/.test(layoutSource)
          const hasOgImage = /openGraph:\s*\{[\s\S]*?images:/.test(layoutSource)
          const hasTwitterCard = /twitter:\s*\{[\s\S]*?card:/.test(layoutSource)
          const hasTwitterTitle = /twitter:\s*\{[\s\S]*?title:/.test(layoutSource)
          const hasTwitterDesc = /twitter:\s*\{[\s\S]*?description:/.test(layoutSource)
          const hasTwitterImages = /twitter:\s*\{[\s\S]*?images:/.test(layoutSource)
          
          return hasCanonical && 
                 hasOgTitle && hasOgDesc && hasOgImage &&
                 hasTwitterCard && hasTwitterTitle && hasTwitterDesc && hasTwitterImages
        }
      ),
      { numRuns: 100 }
    )
  })
})


/**
 * Property 13: Breadcrumb Schema Presence
 * 
 * For any render of the landing page, there SHALL be BreadcrumbList schema
 * markup in the JSON-LD structured data.
 * 
 * **Validates: Requirements 10.6**
 */
describe('Property 13: Breadcrumb Schema Presence', () => {
  const layoutSource = fs.readFileSync(
    path.join(process.cwd(), 'app/layout.tsx'),
    'utf-8'
  )

  it('should have BreadcrumbList schema defined', () => {
    // Check for BreadcrumbList type in structured data
    const breadcrumbMatch = layoutSource.match(/"@type":\s*["']BreadcrumbList["']/)
    
    expect(breadcrumbMatch).not.toBeNull()
  })

  it('should have BreadcrumbList with schema.org context', () => {
    // Check for proper schema.org context
    const contextMatch = layoutSource.match(/breadcrumbStructuredData\s*=\s*\{[\s\S]*?"@context":\s*["']https:\/\/schema\.org["']/)
    
    expect(contextMatch).not.toBeNull()
  })

  it('should have BreadcrumbList with itemListElement', () => {
    // Check for itemListElement array in breadcrumb schema
    const itemListMatch = layoutSource.match(/breadcrumbStructuredData\s*=\s*\{[\s\S]*?"itemListElement":\s*\[/)
    
    expect(itemListMatch).not.toBeNull()
  })

  it('should have at least one ListItem in BreadcrumbList', () => {
    // Check for ListItem type in breadcrumb schema
    const listItemMatch = layoutSource.match(/breadcrumbStructuredData\s*=\s*\{[\s\S]*?"@type":\s*["']ListItem["']/)
    
    expect(listItemMatch).not.toBeNull()
  })

  it('should have ListItem with position property', () => {
    // Check for position property in ListItem
    const positionMatch = layoutSource.match(/breadcrumbStructuredData\s*=\s*\{[\s\S]*?"position":\s*\d+/)
    
    expect(positionMatch).not.toBeNull()
  })

  it('should have ListItem with name property', () => {
    // Check for name property in ListItem
    const nameMatch = layoutSource.match(/breadcrumbStructuredData\s*=\s*\{[\s\S]*?"name":\s*["'][^"']+["']/)
    
    expect(nameMatch).not.toBeNull()
  })

  it('should have ListItem with item (URL) property', () => {
    // Check for item property in ListItem
    const itemMatch = layoutSource.match(/breadcrumbStructuredData\s*=\s*\{[\s\S]*?"item":\s*[^,\n]+/)
    
    expect(itemMatch).not.toBeNull()
  })

  it('should render BreadcrumbList schema as JSON-LD script', () => {
    // Check that breadcrumb schema is rendered in a script tag
    const scriptMatch = layoutSource.match(/id=["']structured-data-breadcrumb["'][\s\S]*?type=["']application\/ld\+json["']/)
    
    expect(scriptMatch).not.toBeNull()
  })

  it('should maintain breadcrumb schema presence for any page state', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }), // Arbitrary state
        () => {
          // Verify all breadcrumb schema elements are present
          const hasBreadcrumbType = /"@type":\s*["']BreadcrumbList["']/.test(layoutSource)
          const hasContext = /breadcrumbStructuredData[\s\S]*?"@context":\s*["']https:\/\/schema\.org["']/.test(layoutSource)
          const hasItemListElement = /breadcrumbStructuredData[\s\S]*?"itemListElement":\s*\[/.test(layoutSource)
          const hasListItem = /breadcrumbStructuredData[\s\S]*?"@type":\s*["']ListItem["']/.test(layoutSource)
          const hasPosition = /breadcrumbStructuredData[\s\S]*?"position":\s*\d+/.test(layoutSource)
          const hasName = /breadcrumbStructuredData[\s\S]*?"name":\s*["'][^"']+["']/.test(layoutSource)
          const hasItem = /breadcrumbStructuredData[\s\S]*?"item":\s*[^,\n]+/.test(layoutSource)
          const hasScript = /id=["']structured-data-breadcrumb["']/.test(layoutSource)
          
          return hasBreadcrumbType && hasContext && hasItemListElement && 
                 hasListItem && hasPosition && hasName && hasItem && hasScript
        }
      ),
      { numRuns: 100 }
    )
  })
})
