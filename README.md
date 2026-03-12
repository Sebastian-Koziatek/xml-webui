# XML WebUI Editor

## 📋 Opis Projektu

**XML WebUI Editor** to intuicyjna aplikacja webowa służąca do edycji plików XML przez interfejs użytkownika. Aplikacja została zaprojektowana z myślą o osobach nietechnicznych, oferując prosty i przejrzysty sposób przeglądania i modyfikowania zawartości dokumentów XML bez konieczności bezpośredniej edycji kodu źródłowego.

## ✨ Kluczowe Funkcjonalności

### 1. Wczytywanie Plików XML
- **Drag & Drop**: Przeciągnij plik XML bezpośrednio na obszar uploadu
- **Wybór pliku**: Kliknij przycisk i wybierz plik z systemu plików
- **Walidacja**: Automatyczna weryfikacja poprawności formatu XML

### 2. Inteligentny Podgląd Formularza
- **Automatyczne formatowanie**: XML jest prezentowany jako czytelny formularz
- **Grupowanie sekcji**: Elementy są automatycznie grupowane według struktury
- **Czytelne etykiety**: Nazwy tagów są formatowane do postaci czytelnej (np. `imie_nazwisko` → `Imie nazwisko`)
- **Hierarchiczna prezentacja**: Zachowanie logicznej struktury dokumentu
- **Podgląd wartości**: Wszystkie wartości wyświetlone w przystępnej formie

### 3. Intuicyjna Edycja
- **Kliknij i edytuj**: Kliknij wartość po lewej stronie, edytuj po prawej
- **Panel edycji kontekstowy**: Automatyczne dopasowanie formularza do typu elementu
- **Edycja tekstu**: Modyfikacja zawartości tekstowej elementów
- **Zarządzanie atrybutami**: 
  - Edycja nazw i wartości atrybutów
  - Dodawanie nowych atrybutów
  - Usuwanie istniejących atrybutów
- **Automatyczne aktualizacje**: Zmiany są natychmiast widoczne w podglądzie
- **Przewijanie do elementu**: Po wybraniu pola, automatyczne przewinięcie do edytowanego elementu

### 4. Pobieranie Pliku
- **Export**: Pobierz zmodyfikowany plik XML
- **Formatowanie**: Automatyczne formatowanie z wcięciami dla lepszej czytelności
- **Zachowanie nazwy**: Plik jest zapisywany z oryginalną nazwą

## 🚀 Jak Zacząć

### Wymagania Systemowe
- **Przeglądarka**: Nowoczesna przeglądarka obsługująca HTML5, CSS3 i ES6+
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
- **JavaScript**: Musi być włączony w przeglądarce
- **Brak wymagań serwerowych**: Aplikacja działa całkowicie po stronie klienta

### Instalacja i Uruchomienie

1. **Sklonuj repozytorium**:
   ```bash
   git clone https://github.com/Sebastian-Koziatek/xml-webui.git
   cd xml-webui
   ```

2. **Uruchom aplikację**:
   - **Opcja A**: Otwórz plik `index.html` bezpośrednio w przeglądarce
   - **Opcja B**: Użyj prostego serwera HTTP (zalecane dla testowania):
     ```bash
     # Python 3
     python3 -m http.server 8000
     
     # Node.js (npx http-server)
     npx http-server -p 8000
     ```
   - Następnie otwórz przeglądarkę i przejdź do `http://localhost:8000`

3. **Gotowe!** Aplikacja jest teraz dostępna i gotowa do użycia.

## 📖 Instrukcja Użytkowania

### Krok 1: Wczytanie Pliku XML

1. Otwórz aplikację w przeglądarce
2. Użyj jednej z metod wczytania pliku:
   - **Przeciągnij i upuść**: Przeciągnij plik XML na obszar oznaczony ikoną �
   - **Kliknięcie**: Kliknij przycisk "Wybierz plik" i wybierz plik z dysku

### Krok 2: Przeglądanie Podglądu Formularza

1. Po wczytaniu pliku zobaczysz podgląd formularza po lewej stronie ekranu
2. Elementy są wyświetlone jako pary **etykieta → wartość**:
   - **Etykiety**: Nazwy pól z XML, automatycznie sformatowane
   - **Wartości**: Aktualna zawartość każdego pola
3. Sekcje są pogrupowane według struktury XML:
   - **Tytuły sekcji**: Wyróżnione większą czcionką
   - **Pola**: Zgrupowane logicznie według struktury dokumentu
4. Przewijaj listę aby zobaczyć wszystkie pola

### Krok 3: Edycja Wartości

1. **Kliknij na dowolną wartość** po lewej stronie ekranu
2. Pole zostanie podświetlone i automatycznie przewinie się do widoku
3. Po prawej stronie pojawi się panel edycji z:
   - **Nazwą elementu**: Informacja o edytowanym polu
   - **Polem edycji**: Wprowadź nową wartość
   - **Atrybutami** (jeśli istnieją): Lista wszystkich atrybutów elementu
4. Wprowadź zmiany w polu tekstowym lub textarea
5. Zmiany są zapisywane automatycznie po opuszczeniu pola
6. Podgląd po lewej stronie aktualizuje się natychmiast

### Krok 4: Zarządzanie Atrybutami

- **Edycja atrybutu**: Kliknij wartość atrybutu w podglądzie lub edytuj w panelu prawym
- **Dodawanie**: Przewiń panel edycji w dół i kliknij przycisk "+ Dodaj Atrybut"
- **Usuwanie**: Kliknij przycisk "✕" obok atrybutu, który chcesz usunąć
- Zmiany w atrybutach również są widoczne od razu w podglądzie

### Krok 5: Pobieranie Zmodyfikowanego Pliku

1. Kliknij przycisk "Pobierz plik" w prawym górnym rogu
2. Plik zostanie automatycznie pobrany do domyślnego folderu pobierania
3. Zachowana zostanie oryginalna nazwa pliku z zachowaniem wszystkich zmian

### Resetowanie

- Kliknij przycisk "Zacznij od nowa", aby wczytać nowy plik
- Bieżące zmiany nie zostaną zapisane, chyba że wcześniej pobierzesz plik

## 💡 Przykład Użycia

### Scenariusz: Edycja formularza rekrutacyjnego

1. **Wczytaj plik** `formularz-kandydata.xml` zawierający dane kandydata
2. **Przeglądaj sekcje** w podglądzie:
   - Dane osobowe (imię, nazwisko, email)
   - Adres (ulica, miasto, kod pocztowy)
   - Wykształcenie (uczelnia, kierunek, rok)
   - Doświadczenie zawodowe (firma, stanowisko, opis)
3. **Kliknij na pole "Email"** po lewej stronie
4. **Zmień wartość** w panelu edycji po prawej na nowy adres email
5. **Kliknij na pole "Opis doświadczenia"**
6. **Rozbuduj opis** w dużym polu textarea
7. **Pobierz plik** z aktualnymi danymi
8. Gotowe! Plik XML został zaktualizowany

## 🏗️ Architektura Aplikacji

### Struktura Plików

```
xml-webui/
├── index.html          # Struktura HTML aplikacji
├── styles.css          # Style i layout (responsive design)
├── app.js              # Logika aplikacji
├── README.md           # Dokumentacja
└── .github/
    └── AGENTS.md       # Instrukcje dla agentów AI
```

### Komponenty Aplikacji

#### 1. **index.html** - Warstwa Prezentacji
- Semantyczny markup HTML5
- Struktura podzielona na sekcje:
  - **Upload Section**: Obszar wczytywania plików
  - **Editor Section**: Widok drzewa + panel edycji
  - **Message Container**: Powiadomienia dla użytkownika

#### 2. **styles.css** - Warstwa Stylizacji
- **CSS Custom Properties**: Centralne zarządzanie kolorami i wartościami
- **Apple Design System**: Minimalistyczny, elegancki design inspirowany macOS/iOS
- **Responsive Design**: Automatyczne dostosowanie do urządzeń mobilnych
- **Subtelne animacje**: Płynne przejścia i micro-interactions
- **Accessibility**: Wysoki kontrast i czytelne czcionki

**Kluczowe komponenty stylów:**
- `.preview-section`: Grupowanie logicznych sekcji formularza
- `.preview-field`: Pojedyncze pole formularza (etykieta + wartość)
- `.preview-label`: Czytelna etykieta pola (uppercase, mniejsza czcionka)
- `.preview-value`: Wartość pola z odpowiednim formatowaniem
- `.edit-panel`: Panel edycji z reaktywnym layoutem

#### 3. **app.js** - Warstwa Logiki
Główne moduły funkcjonalne:

##### **AppState** - Zarządzanie Stanem
```javascript
const AppState = {
    xmlDocument: null,      // Parsowany dokument XML
    originalFileName: '',   // Nazwa pliku
    selectedNode: null,     // Aktualnie wybrany węzeł
    nodeMap: new Map()      // Mapowanie UID -> węzeł XML
}
```

##### **Moduł Obsługi Plików**
- `handleFileSelect()` - wybór pliku przez input
- `handleDragOver()` / `handleDrop()` - drag & drop
- `readXMLFile()` - odczyt zawartości pliku
- `isValidXMLFile()` - walidacja typu pliku

##### **Moduł Parsowania XML**
- `parseAndDisplayXML()` - parsowanie tekstu XML
- `buildPreview()` - budowanie inteligentnego podglądu formularza
- `processElementForPreview()` - rekurencyjne przetwarzanie struktury XML
- `createPreviewField()` - tworzenie pól podglądu dla elementów
- `createPreviewFieldForAttribute()` - tworzenie pól dla atrybutów
- `formatLabel()` - automatyczne formatowanie etykiet (camelCase → Camel case)

**Logika budowania podglądu:**
1. Analiza struktury XML i identyfikacja sekcji
2. Grupowanie powtarzających się elementów
3. Formatowanie etykiet do postaci czytelnej
4. Tworzenie hierarchii sekcji i pól
5. Przypisywanie unikalnych identyfikatorów (UID) do każdego pola

##### **Moduł Edycji**
- `selectNode()` - wybór pola do edycji (element lub atrybut)
- `displayEditPanel()` - wyświetlanie panelu edycji z kontekstem
- `updateNodeTextContent()` - modyfikacja zawartości z auto-refresh
- `updateAttribute*()` - zarządzanie atrybutami z walidacją
- `createFormGroup()` - dynamiczne tworzenie formularzy edycji

**Funkcje pomocnicze edycji:**
- Automatyczne przewijanie do wybranego elementu
- Podświetlanie aktywnego pola w podglądzie
- Odświeżanie podglądu po każdej zmianie
- Obsługa zarówno elementów jak i atrybutów

##### **Moduł Eksportu**
- `downloadXML()` - generowanie i pobieranie pliku
- `formatXML()` - formatowanie z wcięciami

### Kluczowe Decyzje Projektowe

#### 1. **Architektura Single Page Application (SPA)**
- **Uzasadnienie**: Wszystkie operacje wykonywane lokalnie bez serwera
- **Zalety**: 
  - Szybkość działania
  - Brak wymagań backendowych
  - Prywatność danych (wszystko pozostaje w przeglądarce)

#### 2. **Vanilla JavaScript (bez frameworków)**
- **Uzasadnienie**: Prostota i minimalizacja zależności
- **Zalety**:
  - Brak node_modules (~0 KB zamiast ~100 MB)
  - Szybsze ładowanie
  - Łatwiejsze wdrożenie i maintenance
  - Pełna kontrola nad kodem

#### 3. **DOM Parser API**
- **Uzasadnienie**: Natywne API przeglądarki do parsowania XML
- **Zalety**:
  - Wysoka wydajność
  - Pełna zgodność ze standardem
  - Automatyczna walidacja

#### 4. **Mapowanie węzłów przez UID**
- **Uzasadnienie**: Bezpośrednie odniesienia do węzłów XML mogą się gubić przy przebudowie drzewa
- **Rozwiązanie**: 
  ```javascript
  nodeMap: new Map() // uid -> xmlNode
  ```
- **Zalety**:
  - Stabilne odniesienia
  - Łatwe odnalezienie węzła po kliknięciu
  - Wydajność O(1) dla dostępu

#### 5. **Responsive Design First**
- **Uzasadnienie**: Aplikacja musi działać na różnych urządzeniach
- **Implementacja**:
  - Grid layout dla desktopu (dwie kolumny)
  - Single column dla mobile/tablet
  - Touch-friendly kontrolki

#### 6. **Inteligentny Podgląd Formularza**
- **Uzasadnienie**: Użytkownicy nietechniczni potrzebują czytelnego interfejsu, a nie surowego drzewa XML
- **Implementacja**:
  - Automatyczna analiza struktury XML i identyfikacja wzorców
  - Grupowanie logicznych sekcji (np. wszystkie elementy tego samego typu)
  - Formatowanie etykiet (transformacja nazw tagów na czytelne etykiety)
  - Hierarchiczne wyświetlanie zagnieżdżonych struktur
- **Zalety**:
  - Intuicyjny interfejs przypominający formularz
  - Łatwe odnalezienie konkretnego pola
  - Szybka edycja bez znajomości struktury XML
  - Idealne dla formularzy, ankiet, konfiguracji

### Jak Działa System Podglądu Formularza

#### Proces Budowania Podglądu

1. **Parsowanie XML**
   ```javascript
   const xmlDoc = new DOMParser().parseFromString(xmlText, 'text/xml');
   ```

2. **Analiza Struktury**
   - Rekurencyjne przetwarzanie elementów od korzenia
   - Identyfikacja elementów liści (zawierających wartości tekstowe)
   - Wykrywanie powtarzających się struktur (listy elementów)
   - Grupowanie atrybutów

3. **Formatowanie Etykiet**
   ```javascript
   formatLabel("imie_nazwisko") → "Imie nazwisko"
   formatLabel("dataUrodzenia") → "Data urodzenia"
   formatLabel("email-address") → "Email address"
   ```

4. **Tworzenie Hierarchii Sekcji**
   - Główne sekcje (pierwszy poziom zagnieżdżenia)
   - Podsekcje (kolejne poziomy)
   - Pola końcowe (elementy z wartościami)

5. **Mapowanie do DOM**
   - Każde pole otrzymuje unikalny UID
   - Mapowanie UID → węzeł XML dla szybkiego dostępu
   - Dodanie event listenerów do każdego pola

#### Przykład Transformacji

**XML wejściowy:**
```xml
<formularz>
  <daneOsobowe>
    <imie>Jan</imie>
    <nazwisko>Kowalski</nazwisko>
    <email>jan@example.com</email>
  </daneOsobowe>
  <adres>
    <ulica>Główna 1</ulica>
    <miasto>Warszawa</miasto>
  </adres>
</formularz>
```

**Podgląd wygenerowany:**
```
┌─ Dane osobowe ─────────────┐
│ IMIĘ                       │
│ Jan                        │
│                            │
│ NAZWISKO                   │
│ Kowalski                   │
│                            │
│ EMAIL                      │
│ jan@example.com            │
└────────────────────────────┘

┌─ Adres ────────────────────┐
│ ULICA                      │
│ Główna 1                   │
│                            │
│ MIASTO                     │
│ Warszawa                   │
└────────────────────────────┘
```

#### Interakcja Użytkownika

1. **Kliknięcie na pole** → `selectNode(uid)`
2. **Wyszukanie węzła** → `nodeMap.get(uid)`
3. **Podświetlenie** → dodanie klasy `.selected`
4. **Przewinięcie** → `scrollIntoView({ behavior: 'smooth' })`
5. **Wyświetlenie edytora** → `displayEditPanel()`
6. **Aktualizacja wartości** → modyfikacja DOM XML
7. **Odświeżenie podglądu** → `buildPreview()`

## 🎨 Interfejs Użytkownika

### Design System - Apple Inspired

**Filozofia projektowa:**
- Minimalizm i czytelność
- Subtelne animacje i przejścia
- Przestrzeń oddechowa (generous whitespace)
- Hierarchia typograficzna
- Konsystentne zaokrąglenia i cienie

### Paleta Kolorów
- **Primary**: `#007AFF` (niebieski systemu iOS) - akcje podstawowe
- **Success**: `#34C759` (zielony) - akcje pozytywne, sukces
- **Danger**: `#FF3B30` (czerwony) - akcje destruktywne
- **Text**: `#000000` / `#8E8E93` - tekst główny / pomocniczy
- **Background**: `#FFFFFF` / `#F5F5F7` - tło główne / pomocnicze
- **Separator**: `rgba(60, 60, 67, 0.12)` - linie rozdzielające

### Typografia
- **Font Family**: `-apple-system, BlinkMacSystemFont, 'SF Pro Display'`
- **Rozmiary**: 
  - H1: 48px (tytuł główny)
  - H2: 32px (tytuły sekcji)
  - H3: 22px (tytuły paneli)
  - Body: 17px (tekst główny)
  - Label: 13px (etykiety)
  - Small: 12px (tekst pomocniczy)
- **Line Height**: 1.47059 (Apple standard)
- **Letter Spacing**: -0.022em (optical tracking)

### Komponenty UI

#### Przyciski
Wszystkie przyciski używają **pill-shaped design** (border-radius: 980px):
- **Primary** (`#007AFF`) - główne akcje (wybór pliku, zatwierdź)
- **Secondary** (`rgba(142, 142, 147, 0.12)`) - akcje pomocnicze (zacznij od nowa)
- **Success** (`#34C759`) - akcje zapisu (pobierz plik)
- Efekt hover: zmiana opacity (0.85) zamiast koloru
- Brak cieni – minimalistyczny flat design

#### Pola Podglądu
- **preview-field**: Klikalne pole z wartością
  - Padding: 12px
  - Border-radius: 8px
  - Hover: `rgba(0, 0, 0, 0.04)` background
  - Selected: `rgba(0, 122, 255, 0.1)` background
- **preview-label**: Etykieta w stylu Apple
  - Font-size: 13px
  - Color: `#8E8E93` (text-secondary)
  - Text-transform: uppercase
  - Font-weight: 500
- **preview-value**: Wartość pola
  - Font-size: 17px
  - Color: `#000000`
  - Word-break: break-word

#### Panel Edycji
- Border: `1px solid var(--separator)`
- Border-radius: 12px
- Padding: 24px
- Background: white
- Max-height: 600px z scrollem

#### Formularze
- **Input fields**: 
  - Border: 1px solid separator
  - Border-radius: 8px
  - Padding: 10px 12px
  - Focus: niebieska ramka + shadow `rgba(0, 122, 255, 0.1)`
- **Textarea**: 
  - Font: SF Mono (monospace)
  - Min-height: 80px
  - Resize: vertical

#### Animacje
- **fadeIn** - płynne pojawianie się sekcji
- **slideIn** - komunikaty systemowe (z góry, 300ms ease)
- **hover effects** - subtelne podświetlenia (0.2s ease)
- **scrollIntoView** - płynne przewijanie do wybranego elementu
- Brak nadmiarowych animacji - zasada "less is more"

## 🔒 Bezpieczeństwo

### Bezpieczeństwo Danych
- ✅ **Całkowicie po stronie klienta**: Pliki nie są wysyłane na serwer
- ✅ **Brak zewnętrznych zapytań**: Żadne dane nie opuszczają przeglądarki
- ✅ **Prywatność**: Pełna kontrola użytkownika nad danymi

### Walidacja
- ✅ **Walidacja typu pliku**: Akceptowane tylko pliki `.xml`
- ✅ **Parser validation**: Automatyczne wykrywanie błędów w XML
- ✅ **Error handling**: Obsługa wyjątków na każdym poziomie

### Best Practices
- ✅ **CSP-ready**: Brak inline scripts/styles (opcjonalnie)
- ✅ **XSS protection**: Bezpieczne operacje na DOM
- ✅ **Input sanitization**: Walidacja danych wejściowych

## 🧪 Testowanie

### Przypadki Testowe

#### Test 1: Wczytywanie Pliku
**Kroki**:
1. Otwórz aplikację
2. Wybierz prawidłowy plik XML
3. Sprawdź czy struktura jest wyświetlona

**Oczekiwany wynik**: Drzewo XML jest widoczne, żadnych błędów

#### Test 2: Edycja Zawartości
**Kroki**:
1. Wczytaj plik XML
2. Kliknij na element w drzewie
3. Zmień zawartość tekstową
4. Sprawdź czy widok drzewa się zaktualizował

**Oczekiwany wynik**: Zmiany są widoczne natychmiast

#### Test 3: Zarządzanie Atrybutami
**Kroki**:
1. Wybierz element z atrybutami
2. Dodaj nowy atrybut
3. Zmień wartość istniejącego
4. Usuń atrybut

**Oczekiwany wynik**: Wszystkie operacje działają poprawnie

#### Test 4: Pobieranie Pliku
**Kroki**:
1. Wprowadź zmiany w XML
2. Kliknij "Pobierz Zmieniony Plik"
3. Otwórz pobrany plik

**Oczekiwany wynik**: Plik zawiera wprowadzone zmiany

#### Test 5: Drag & Drop
**Kroki**:
1. Przeciągnij plik XML na obszar uploadu
2. Sprawdź czy plik został wczytany

**Oczekiwany wynik**: Plik wczytany pomyślnie

#### Test 6: Walidacja
**Kroki**:
1. Spróbuj wczytać plik nie-XML
2. Spróbuj wczytać uszkodzony XML

**Oczekiwany wynik**: Komunikaty błędów

#### Test 7: Responsive Design
**Kroki**:
1. Otwórz aplikację na różnych rozdzielczościach
2. Sprawdź layout na mobile/tablet/desktop

**Oczekiwany wynik**: UI dostosowuje się do rozmiaru ekranu

### Przykładowy Plik XML do Testów

```xml
<?xml version="1.0" encoding="UTF-8"?>
<biblioteka>
    <ksiazka id="1" dostepna="tak">
        <tytul>Programowanie w JavaScript</tytul>
        <autor>Jan Kowalski</autor>
        <rok>2024</rok>
        <kategoria>Informatyka</kategoria>
    </ksiazka>
    <ksiazka id="2" dostepna="nie">
        <tytul>Wprowadzenie do AI</tytul>
        <autor>Anna Nowak</autor>
        <rok>2023</rok>
        <kategoria>Sztuczna Inteligencja</kategoria>
    </ksiazka>
</biblioteka>
```

## 🔧 Rozwijanie Aplikacji

### Możliwe Rozszerzenia

#### Krótkoterminowe
- [ ] Dodanie funkcji "Cofnij/Ponów" (Undo/Redo)
- [ ] Search/filter w drzewie XML
- [ ] Eksport do innych formatów (JSON, CSV)
- [ ] Dark mode
- [ ] Zapisywanie w localStorage (kontynuacja pracy)

#### Średnioterminowe
- [ ] Walidacja względem XML Schema (XSD)
- [ ] Podświetlanie składni XML
- [ ] Porównywanie wersji (diff)
- [ ] Batch editing (edycja wielu węzłów)
- [ ] Import/merge wielu plików XML

#### Długoterminowe
- [ ] Backend API dla współdzielenia plików
- [ ] Real-time collaboration (WebSockets)
- [ ] Version control integration
- [ ] Template system dla typowych struktur
- [ ] Plugin/extension system

### Wkład w Rozwój

Projekt jest otwarty na współpracę! Jeśli chcesz przyczynić się do rozwoju:

1. **Fork** repozytorium
2. Utwórz **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** zmiany (`git commit -m 'Add some AmazingFeature'`)
4. **Push** do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz **Pull Request**

### Style Guide

- **JavaScript**: Google JavaScript Style Guide
- **HTML**: Semantic HTML5, accessibility first
- **CSS**: BEM methodology (opcjonalnie), CSS custom properties
- **Commits**: Conventional Commits format

## 📝 Licencja

Projekt dostępny na licencji MIT - szczegóły w pliku `LICENSE`.

## 👤 Autor

**Sebastian Koziatek**
- GitHub: [@Sebastian-Koziatek](https://github.com/Sebastian-Koziatek)
- Email: sebastian.koziatek@sadmin.pl

## 🙏 Podziękowania

- Inspiracja: Różne edytory XML dostępne na rynku
- Ikony: Unicode Emoji
- Gradient: uiGradients
- Typography: System Font Stack

## 📚 Dodatkowe Zasoby

### Dokumentacja Techniczna
- [MDN: DOM Parser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)
- [MDN: XMLSerializer](https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer)
- [W3C XML Specification](https://www.w3.org/TR/xml/)

### Narzędzia Pomocnicze
- **Walidatory XML**: [XML Validator](https://www.xmlvalidation.com/)
- **Formattery**: [FreeFormatter XML Formatter](https://www.freeformatter.com/xml-formatter.html)

---

**Wersja**: 1.0  
**Data ostatniej aktualizacji**: 12 marca 2026  
**Status**: ✅ Production Ready
