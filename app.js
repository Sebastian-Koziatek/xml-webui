/**
 * XML WebUI Editor
 * Prosty i intuicyjny edytor plików XML
 * 
 * @author Senior Software Engineer
 * @version 1.0
 */

// ===== Stan aplikacji =====
const AppState = {
    xmlDocument: null,
    originalFileName: '',
    selectedNode: null,
    nodeMap: new Map() // Mapowanie uid -> węzeł XML
};

// ===== Inicjalizacja aplikacji =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Inicjalizuje aplikację i nasłuchiwacze zdarzeń
 */
function initializeApp() {
    const fileInput = document.getElementById('file-input');
    const uploadArea = document.getElementById('upload-area');

    // Obsługa wyboru pliku
    fileInput.addEventListener('change', handleFileSelect);

    // Obsługa drag & drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => fileInput.click());

    console.log('XML WebUI Editor initialized');
}

// ===== Obsługa plików =====

/**
 * Obsługuje zdarzenie przeciągnięcia pliku nad obszarem uploadu
 */
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
}

/**
 * Obsługuje zdarzenie opuszczenia obszaru uploadu
 */
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
}

/**
 * Obsługuje zdarzenie upuszczenia pliku
 */
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (isValidXMLFile(file)) {
            readXMLFile(file);
        } else {
            showMessage('Proszę wybrać plik XML (.xml)', 'error');
        }
    }
}

/**
 * Obsługuje wybór pliku przez input
 */
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file && isValidXMLFile(file)) {
        readXMLFile(file);
    } else {
        showMessage('Proszę wybrać prawidłowy plik XML', 'error');
    }
}

/**
 * Sprawdza czy plik jest prawidłowym plikiem XML
 */
function isValidXMLFile(file) {
    return file && file.name.toLowerCase().endsWith('.xml');
}

/**
 * Odczytuje zawartość pliku XML
 */
function readXMLFile(file) {
    AppState.originalFileName = file.name;
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const xmlText = e.target.result;
            parseAndDisplayXML(xmlText);
            showMessage(`Plik "${file.name}" został wczytany pomyślnie`, 'success');
        } catch (error) {
            console.error('Error reading XML:', error);
            showMessage('Błąd wczytywania pliku XML: ' + error.message, 'error');
        }
    };
    
    reader.onerror = () => {
        showMessage('Błąd odczytu pliku', 'error');
    };
    
    reader.readAsText(file);
}

// ===== Parsowanie i wyświetlanie XML =====

/**
 * Parsuje XML i wyświetla w edytorze
 */
function parseAndDisplayXML(xmlText) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Sprawdź czy wystąpiły błędy parsowania
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('Nieprawidłowy format XML');
        }
        
        AppState.xmlDocument = xmlDoc;
        AppState.nodeMap.clear();
        
        // Pokaż sekcję edytora
        document.getElementById('upload-section').classList.add('hidden');
        document.getElementById('editor-section').classList.remove('hidden');
        
        // Wyświetl nazwę pliku
        document.getElementById('file-name').textContent = `📄 ${AppState.originalFileName}`;
        document.getElementById('file-info').classList.remove('hidden');
        
        // Zbuduj widok drzewa
        buildTreeView();
        
    } catch (error) {
        console.error('Error parsing XML:', error);
        showMessage('Błąd parsowania XML: ' + error.message, 'error');
    }
}

/**
 * Buduje widok drzewa XML
 */
function buildTreeView() {
    const treeView = document.getElementById('tree-view');
    treeView.innerHTML = '';
    
    const rootElement = AppState.xmlDocument.documentElement;
    const treeNode = createTreeNode(rootElement, 0);
    treeView.appendChild(treeNode);
}

/**
 * Tworzy pojedynczy węzeł drzewa
 */
function createTreeNode(xmlNode, level, uid = generateUID()) {
    // Zapisz mapowanie
    AppState.nodeMap.set(uid, xmlNode);
    
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'tree-node';
    nodeDiv.dataset.uid = uid;
    nodeDiv.style.paddingLeft = `${level * 12}px`;
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'tree-node-header';
    
    // Sprawdź czy węzeł ma dzieci
    const hasChildren = xmlNode.children && xmlNode.children.length > 0;
    
    // Toggle dla rozwijania/zwijania
    if (hasChildren) {
        const toggle = document.createElement('span');
        toggle.className = 'tree-toggle';
        toggle.textContent = '▼';
        toggle.onclick = (e) => {
            e.stopPropagation();
            toggleNode(nodeDiv);
        };
        headerDiv.appendChild(toggle);
    } else {
        const spacer = document.createElement('span');
        spacer.className = 'tree-toggle';
        spacer.textContent = '•';
        headerDiv.appendChild(spacer);
    }
    
    // Nazwa tagu
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tree-tag';
    tagSpan.textContent = `<${xmlNode.tagName}>`;
    headerDiv.appendChild(tagSpan);
    
    // Wartość tekstowa (jeśli istnieje)
    const textContent = getNodeTextContent(xmlNode);
    if (textContent) {
        const valueSpan = document.createElement('span');
        valueSpan.className = 'tree-value';
        valueSpan.textContent = textContent.length > 50 
            ? textContent.substring(0, 50) + '...' 
            : textContent;
        headerDiv.appendChild(valueSpan);
    }
    
    // Obsługa kliknięcia - wybór węzła do edycji
    headerDiv.onclick = () => selectNode(uid);
    
    nodeDiv.appendChild(headerDiv);
    
    // Dzieci
    if (hasChildren) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'tree-children';
        
        Array.from(xmlNode.children).forEach(child => {
            const childNode = createTreeNode(child, level + 1, generateUID());
            childrenDiv.appendChild(childNode);
        });
        
        nodeDiv.appendChild(childrenDiv);
    }
    
    return nodeDiv;
}

/**
 * Pobiera tekstową zawartość węzła (bez białych znaków)
 */
function getNodeTextContent(node) {
    let text = '';
    for (let child of node.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
            text += child.nodeValue;
        }
    }
    return text.trim();
}

/**
 * Rozwijanie/zwijanie węzła
 */
function toggleNode(nodeDiv) {
    const childrenDiv = nodeDiv.querySelector('.tree-children');
    const toggle = nodeDiv.querySelector('.tree-toggle');
    
    if (childrenDiv) {
        childrenDiv.classList.toggle('collapsed');
        toggle.textContent = childrenDiv.classList.contains('collapsed') ? '▶' : '▼';
    }
}

/**
 * Generuje unikalny identyfikator
 */
function generateUID() {
    return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ===== Edycja węzłów =====

/**
 * Wybiera węzeł do edycji
 */
function selectNode(uid) {
    // Usuń poprzednie zaznaczenie
    const previousSelected = document.querySelector('.tree-node.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    
    // Zaznacz nowy węzeł
    const nodeDiv = document.querySelector(`[data-uid="${uid}"]`);
    if (nodeDiv) {
        nodeDiv.classList.add('selected');
    }
    
    // Zapisz wybrany węzeł
    AppState.selectedNode = {
        uid: uid,
        xmlNode: AppState.nodeMap.get(uid)
    };
    
    // Pokaż panel edycji
    displayEditPanel();
}

/**
 * Wyświetla panel edycji dla wybranego węzła
 */
function displayEditPanel() {
    const editPanel = document.getElementById('edit-panel');
    const xmlNode = AppState.selectedNode.xmlNode;
    
    if (!xmlNode) {
        editPanel.innerHTML = '<div class="edit-panel-empty"><p>Wybierz element do edycji</p></div>';
        return;
    }
    
    editPanel.innerHTML = '';
    
    const form = document.createElement('div');
    form.className = 'edit-form';
    
    // Nagłówek
    const header = document.createElement('h3');
    header.textContent = `Edycja: <${xmlNode.tagName}>`;
    form.appendChild(header);
    
    // Edycja zawartości tekstowej
    const textContent = getNodeTextContent(xmlNode);
    if (textContent || xmlNode.children.length === 0) {
        const textGroup = createFormGroup(
            'Zawartość tekstowa:',
            'textarea',
            textContent,
            (value) => updateNodeTextContent(xmlNode, value)
        );
        form.appendChild(textGroup);
    }
    
    // Edycja atrybutów
    if (xmlNode.attributes && xmlNode.attributes.length > 0) {
        const attrsHeader = document.createElement('h4');
        attrsHeader.textContent = 'Atrybuty:';
        attrsHeader.style.marginTop = '20px';
        form.appendChild(attrsHeader);
        
        const attrList = document.createElement('div');
        attrList.className = 'attribute-list';
        
        Array.from(xmlNode.attributes).forEach(attr => {
            const attrItem = createAttributeItem(xmlNode, attr.name, attr.value);
            attrList.appendChild(attrItem);
        });
        
        form.appendChild(attrList);
        
        // Przycisk dodawania atrybutu
        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add';
        addBtn.textContent = '+ Dodaj Atrybut';
        addBtn.onclick = () => addNewAttribute(xmlNode, attrList);
        form.appendChild(addBtn);
    }
    
    editPanel.appendChild(form);
}

/**
 * Tworzy grupę formularza
 */
function createFormGroup(labelText, inputType, value, onChangeCallback) {
    const group = document.createElement('div');
    group.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = labelText;
    group.appendChild(label);
    
    let input;
    if (inputType === 'textarea') {
        input = document.createElement('textarea');
        input.value = value || '';
    } else {
        input = document.createElement('input');
        input.type = inputType;
        input.value = value || '';
    }
    
    input.addEventListener('input', (e) => {
        onChangeCallback(e.target.value);
        showMessage('Zmiany zapisane', 'success');
    });
    
    group.appendChild(input);
    return group;
}

/**
 * Tworzy element atrybutu
 */
function createAttributeItem(xmlNode, attrName, attrValue) {
    const item = document.createElement('div');
    item.className = 'attribute-item';
    
    // Nazwa atrybutu
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = attrName;
    nameInput.placeholder = 'Nazwa';
    nameInput.addEventListener('input', (e) => {
        updateAttributeName(xmlNode, attrName, e.target.value);
    });
    
    // Wartość atrybutu
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.value = attrValue;
    valueInput.placeholder = 'Wartość';
    valueInput.addEventListener('input', (e) => {
        updateAttributeValue(xmlNode, attrName, e.target.value);
    });
    
    // Przycisk usunięcia
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove';
    removeBtn.textContent = '✕';
    removeBtn.onclick = () => {
        xmlNode.removeAttribute(attrName);
        item.remove();
        buildTreeView();
        showMessage('Atrybut usunięty', 'success');
    };
    
    item.appendChild(nameInput);
    item.appendChild(valueInput);
    item.appendChild(removeBtn);
    
    return item;
}

/**
 * Dodaje nowy atrybut
 */
function addNewAttribute(xmlNode, attrList) {
    const newAttrName = `nowy_atrybut_${Date.now()}`;
    xmlNode.setAttribute(newAttrName, '');
    
    const attrItem = createAttributeItem(xmlNode, newAttrName, '');
    attrList.appendChild(attrItem);
    
    buildTreeView();
    showMessage('Nowy atrybut dodany', 'success');
}

/**
 * Aktualizuje zawartość tekstową węzła
 */
function updateNodeTextContent(xmlNode, newValue) {
    // Usuń wszystkie węzły tekstowe
    for (let i = xmlNode.childNodes.length - 1; i >= 0; i--) {
        if (xmlNode.childNodes[i].nodeType === Node.TEXT_NODE) {
            xmlNode.removeChild(xmlNode.childNodes[i]);
        }
    }
    
    // Dodaj nowy węzeł tekstowy
    if (newValue) {
        const textNode = AppState.xmlDocument.createTextNode(newValue);
        xmlNode.appendChild(textNode);
    }
    
    buildTreeView();
}

/**
 * Aktualizuje nazwę atrybutu
 */
function updateAttributeName(xmlNode, oldName, newName) {
    if (oldName !== newName && newName) {
        const value = xmlNode.getAttribute(oldName);
        xmlNode.removeAttribute(oldName);
        xmlNode.setAttribute(newName, value);
        buildTreeView();
        displayEditPanel();
        showMessage('Nazwa atrybutu zmieniona', 'success');
    }
}

/**
 * Aktualizuje wartość atrybutu
 */
function updateAttributeValue(xmlNode, attrName, newValue) {
    xmlNode.setAttribute(attrName, newValue);
    buildTreeView();
    showMessage('Wartość atrybutu zmieniona', 'success');
}

// ===== Pobieranie pliku =====

/**
 * Pobiera zmodyfikowany plik XML
 */
function downloadXML() {
    try {
        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(AppState.xmlDocument);
        
        // Formatuj XML (dodaj wcięcia)
        const formattedXML = formatXML(xmlString);
        
        // Utwórz blob i pobierz
        const blob = new Blob([formattedXML], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = AppState.originalFileName || 'edited.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        showMessage('Plik został pobrany pomyślnie', 'success');
    } catch (error) {
        console.error('Error downloading XML:', error);
        showMessage('Błąd pobierania pliku: ' + error.message, 'error');
    }
}

/**
 * Formatuje XML z wcięciami
 */
function formatXML(xml) {
    const PADDING = '  '; // 2 spacje
    const reg = /(>)(<)(\/*)/g;
    let formatted = '';
    let pad = 0;

    xml = xml.replace(reg, '$1\n$2$3');

    xml.split('\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        formatted += PADDING.repeat(pad) + node + '\n';
        pad += indent;
    });

    return formatted.trim();
}

// ===== Reset aplikacji =====

/**
 * Resetuje edytor do stanu początkowego
 */
function resetEditor() {
    AppState.xmlDocument = null;
    AppState.originalFileName = '';
    AppState.selectedNode = null;
    AppState.nodeMap.clear();
    
    document.getElementById('upload-section').classList.remove('hidden');
    document.getElementById('editor-section').classList.add('hidden');
    document.getElementById('file-info').classList.add('hidden');
    document.getElementById('file-input').value = '';
    
    showMessage('Edytor został zresetowany', 'info');
}

// ===== Komunikaty =====

/**
 * Wyświetla komunikat dla użytkownika
 */
function showMessage(text, type = 'info') {
    const container = document.getElementById('message-container');
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    container.appendChild(message);
    
    // Automatyczne usunięcie po 3 sekundach
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Dodaj animację do CSS (jeśli jeszcze nie ma)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
