function createNotificationCard({name, description}) {
    const notification_card = document.createElement("div");
    notification_card.classList.add("notification-card");

    const span = document.createElement("span");
    span.classList.add("template-name");
    span.textContent = name;
    notification_card.appendChild(span);

    const row = document.createElement("div");
    row.classList.add("row");
    const description_label = document.createElement("span");
    description_label.classList.add("description-label");
    description_label.textContent = "Description: ";
    row.appendChild(description_label);

    const description_span = document.createElement("span");
    description_span.classList.add("description");
    description_span.textContent = description;
    row.appendChild(description_span);

    notification_card.appendChild(row);

    return notification_card;
}