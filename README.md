# XML WebUI Editor

## 📋 Opis Projektu

**XML WebUI Editor** to intuicyjna aplikacja webowa służąca do edycji plików XML przez interfejs użytkownika. Aplikacja została zaprojektowana z myślą o osobach nietechnicznych, oferując prosty i przejrzysty sposób przeglądania i modyfikowania zawartości dokumentów XML bez konieczności bezpośredniej edycji kodu źródłowego.

## ✨ Kluczowe Funkcjonalności

### 1. Wczytywanie Plików XML
- **Drag & Drop**: Przeciągnij plik XML bezpośrednio na obszar uploadu
- **Wybór pliku**: Kliknij przycisk i wybierz plik z systemu plików
- **Walidacja**: Automatyczna weryfikacja poprawności formatu XML

### 2. Wizualizacja Struktury
- **Widok drzewa**: Hierarchiczna prezentacja struktury XML
- **Rozwijanie/zwijanie**: Interaktywna nawigacja po zagnieżdżonych elementach
- **Podgląd wartości**: Wyświetlanie zawartości tekstowej bezpośrednio w drzewie

### 3. Edycja Elementów
- **Edycja tekstu**: Modyfikacja zawartości tekstowej elementów
- **Zarządzanie atrybutami**: 
  - Edycja nazw i wartości atrybutów
  - Dodawanie nowych atrybutów
  - Usuwanie istniejących atrybutów
- **Automatyczne aktualizacje**: Zmiany są natychmiast widoczne w widoku drzewa

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
   - **Przeciągnij i upuść**: Przeciągnij plik XML na obszar oznaczony ikoną 📁
   - **Kliknięcie**: Kliknij przycisk "Wybierz Plik" i wybierz plik z dysku

### Krok 2: Nawigacja po Strukturze

1. Po wczytaniu pliku zobaczysz strukturę XML w formie drzewa po lewej stronie
2. Elementy z dziećmi mają strzałkę (▼/▶):
   - **▼** - element rozwinięty
   - **▶** - element zwinięty
3. Kliknij strzałkę, aby rozwinąć lub zwinąć element
4. Elementy bez dzieci mają kropkę (•)

### Krok 3: Edycja Elementów

1. Kliknij na dowolny element w drzewie po lewej stronie
2. Po prawej stronie pojawi się panel edycji z:
   - **Zawartością tekstową**: Edytuj tekst wewnątrz elementu
   - **Atrybutami**: Modyfikuj istniejące atrybuty lub dodaj nowe
3. Zmiany są zapisywane automatycznie po wprowadzeniu
4. Widok drzewa aktualizuje się dynamicznie

### Krok 4: Zarządzanie Atrybutami

- **Edycja**: Zmień nazwę lub wartość atrybutu bezpośrednio w polach
- **Dodawanie**: Kliknij przycisk "+ Dodaj Atrybut"
- **Usuwanie**: Kliknij przycisk "✕" obok atrybutu, który chcesz usunąć

### Krok 5: Pobieranie Zmodyfikowanego Pliku

1. Kliknij przycisk "💾 Pobierz Zmieniony Plik" w prawym górnym rogu
2. Plik zostanie automatycznie pobrany do domyślnego folderu pobierania
3. Zachowana zostanie oryginalna nazwa pliku

### Resetowanie

- Kliknij przycisk "🔄 Zacznij Od Nowa", aby wczytać nowy plik
- Bieżące zmiany nie zostaną zapisane, chyba że wcześniej pobierzesz plik

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
- **Flexbox & Grid**: Nowoczesny layout
- **Responsive Design**: Automatyczne dostosowanie do urządzeń mobilnych
- **Animacje**: Płynne przejścia i interakcje
- **Accessibility**: Wysoki kontrast i czytelne czcionki

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
- `buildTreeView()` - budowanie widoku drzewa
- `createTreeNode()` - rekurencyjne tworzenie węzłów

##### **Moduł Edycji**
- `selectNode()` - wybór węzła do edycji
- `displayEditPanel()` - wyświetlanie panelu edycji
- `updateNodeTextContent()` - modyfikacja zawartości
- `updateAttribute*()` - zarządzanie atrybutami

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

## 🎨 Interfejs Użytkownika

### Paleta Kolorów
- **Primary**: `#4CAF50` (zielony) - akcje pozytywne, sukces
- **Secondary**: `#2196F3` (niebieski) - akcje neutralne
- **Gradient**: `#667eea` → `#764ba2` (fioletowy) - tło aplikacji

### Typografia
- **Font Family**: System fonts (-apple-system, Segoe UI, Roboto)
- **Font Sizes**: Skalowane od 1rem do 2.5rem
- **Line Height**: 1.6 dla optymalnej czytelności

### Komponenty UI

#### Przyciski
- **Primary** - główne akcje (wybór pliku)
- **Secondary** - akcje pomocnicze (reset)
- **Success** - akcje zapisu (pobierz plik)
- **Remove** - akcje usuwania (usuń atrybut)

#### Animacje
- **fadeIn** - płynne pojawianie się sekcji
- **slideIn/slideOut** - komunikaty systemowe
- **hover effects** - interaktywne podświetlenia

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
