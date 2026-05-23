import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getT } from '@/lib/i18n-server'

export default async function GuidePage() {
  const t = await getT()
  const steps = [
    { title: t('guide.tasting_step1_title'), text: t('guide.tasting_step1') },
    { title: t('guide.tasting_step2_title'), text: t('guide.tasting_step2') },
    { title: t('guide.tasting_step3_title'), text: t('guide.tasting_step3') },
    { title: t('guide.tasting_step4_title'), text: t('guide.tasting_step4') },
    { title: t('guide.tasting_step5_title'), text: t('guide.tasting_step5') },
  ]

  const aromas = [
    { title: t('guide.aromas_fruity_title'), text: t('guide.aromas_fruity') },
    { title: t('guide.aromas_sweet_title'), text: t('guide.aromas_sweet') },
    { title: t('guide.aromas_spicy_title'), text: t('guide.aromas_spicy') },
    { title: t('guide.aromas_smoky_title'), text: t('guide.aromas_smoky') },
    { title: t('guide.aromas_floral_title'), text: t('guide.aromas_floral') },
    { title: t('guide.aromas_wood_title'), text: t('guide.aromas_wood') },
  ]

  const pairings = [
    t('guide.pairing_peated'),
    t('guide.pairing_bourbon'),
    t('guide.pairing_sherry'),
    t('guide.pairing_light'),
    t('guide.pairing_spicy'),
  ]

  const waterOptions = [
    t('guide.water_neat'),
    t('guide.water_water'),
    t('guide.water_ice'),
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {t('guide.title')}
        </h1>
        <p className="text-muted-foreground">{t('guide.subtitle')}</p>
      </div>

      {/* Section 1: How to taste */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">{t('guide.tasting_title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, i) => (
            <div key={i}>
              <p className="text-sm">
                <span className="font-semibold text-amber">
                  {i + 1}. {step.title}
                </span>{' '}
                — {step.text}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Section 2: What to look for */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">{t('guide.aromas_title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">{t('guide.aromas_intro')}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {aromas.map((aroma, i) => (
              <div key={i} className="rounded-md border border-border/50 p-3">
                <p className="text-sm font-semibold text-amber">{aroma.title}</p>
                <p className="text-sm text-muted-foreground">{aroma.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Section 3: Food pairings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">{t('guide.pairing_title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">{t('guide.pairing_intro')}</p>
          <ul className="mt-3 space-y-2">
            {pairings.map((pairing, i) => (
              <li key={i} className="text-sm">
                {pairing}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Separator />

      {/* Section 4: Water, ice, or neat */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">{t('guide.water_title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">{t('guide.water_intro')}</p>
          <ul className="mt-3 space-y-3">
            {waterOptions.map((option, i) => (
              <li key={i} className="text-sm">{option}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-medium text-amber">{t('guide.water_tip')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
